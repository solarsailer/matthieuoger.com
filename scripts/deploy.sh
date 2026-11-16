#!/usr/bin/env bash

# Publish the site on matthieuoger.com.
#
# The build (public/) is committed to the repository that GitHub Pages serves,
# on top of its history: one commit per publication.
#
# Run it with `just deploy`, which builds the site first.

set -euo pipefail

# Repository served by GitHub Pages: it only contains the built site.
REPOSITORY="git@github.com:solarsailer/solarsailer.github.io.git"

# Files without which a build must never be published.
REQUIRED_FILES="index.html atom.xml feed.json CNAME"

fail() {
  echo "$1" >&2
  exit 1
}

# -------------------------------------------------------------
# Guards.
# -------------------------------------------------------------

# Only the main branch is published.
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "master" ]; then
  fail "On branch '$branch': the site is published from 'master'."
fi

# What is published must match a commit of this repository…
if [ -n "$(git status --porcelain)" ]; then
  fail "Uncommitted changes: commit or stash them first."
fi

# … which is on GitHub too, not only on this machine.
git fetch --quiet origin master
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/master)" ]; then
  fail "'master' differs from 'origin/master': push (or pull) first."
fi

# The build must look like the site: publishing an empty or partial
# folder would delete the site, and without CNAME the domain is lost.
for file in $REQUIRED_FILES; do
  if [ ! -s "public/$file" ]; then
    fail "public/$file is missing or empty: nothing was published."
  fi
done

# -------------------------------------------------------------
# Notice: what Hugo leaves out of a build without a word.
# One line per post, with every reason ("draft, dated in the future").
# -------------------------------------------------------------

unpublished() {
  hugo list "$1" | tail -n +2 | cut -d, -f1 | sed "s/$/|$2/"
}

skipped=$(
  {
    unpublished drafts "draft"
    unpublished future "dated in the future"
    unpublished expired "expired"
  } | awk -F'|' '
    !($1 in reasons) { order[++count] = $1 }
    { reasons[$1] = ($1 in reasons ? reasons[$1] ", " : "") $2 }
    END { for (i = 1; i <= count; i++) print "  - " order[i] " (" reasons[order[i]] ")" }
  '
)

if [ -n "$skipped" ]; then
  echo "Not published:"
  echo "$skipped"
  echo
fi

# -------------------------------------------------------------
# Confirmation.
# -------------------------------------------------------------

read -r -p "Publish the site to matthieuoger.com? [y/N] " answer
if [ "$answer" != "y" ] && [ "$answer" != "Y" ]; then
  echo "Nothing was published."
  exit 0
fi

# -------------------------------------------------------------
# Publication.
# -------------------------------------------------------------

revision=$(git rev-parse --short HEAD)
checkout=$(mktemp -d)
trap 'rm -rf "$checkout"' EXIT

# 1. Get the published repository (its last commit is enough).
git clone --quiet --depth 1 "$REPOSITORY" "$checkout"

# 2. Replace its files with the new build. Files that no longer exist
#    are deleted; its history (.git) is kept.
rsync --archive --delete --exclude .git public/ "$checkout"/

# 3. Commit and push, if something changed.
cd "$checkout"
git add --all

if git diff --cached --quiet; then
  echo "Nothing to publish: the site is already up to date."
  exit 0
fi

git commit --quiet --message "Publish $revision"
git push --quiet origin HEAD:master
echo "Published $revision."
