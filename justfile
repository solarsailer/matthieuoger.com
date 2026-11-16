# Repository served by GitHub Pages: it only contains the built site.
deploy_repository := "git@github.com:solarsailer/solarsailer.github.io.git"

# Development server, with live reload.
start:
	@hugo server -p 8000

# Production build, in public/.
build: clean
	@hugo

# Production build, served on http://localhost:8000/.
prod: build
	@node tests/serve.mjs public 8000

# Build the site and run the tests. Example: just test feeds.spec.js
test *args: build
	npx playwright test -c tests --project=chromium {{args}}

# Run the tooltip tests in Firefox and Safari's engine as well.
test-browsers: build
	npx playwright test -c tests tooltips.spec.js

# Record the reference screenshots. Do it before a change, on a good state.
snapshots: build
	rm -rf tests/snapshots
	npx playwright test -c tests --project=chromium visual.spec.js interactions.spec.js --update-snapshots

# Colors of code blocks, from one of Hugo's styles: https://xyproto.github.io/splash/docs/
code-theme style="catppuccin-frappe":
	@{ echo "@layer vendor {"; hugo gen chromastyles --style={{style}}; echo "}"; } > assets/sass/layers/code-theme.scss

# Format templates with gotmplfmt (tabs, as in Go), the rest with Prettier.
format:
	gotmplfmt -w layouts
	npx prettier --write .

# Publish the site on matthieuoger.com (asks for a confirmation).
[confirm("Publish the site to matthieuoger.com?")]
deploy: build
	#!/usr/bin/env bash
	set -euo pipefail

	# The build (public/) is committed to the repository that GitHub Pages
	# serves, on top of its history: one commit per publication.

	# Only the main branch is published.
	branch=$(git rev-parse --abbrev-ref HEAD)
	if [ "$branch" != "master" ]; then
		echo "On branch '$branch': the site is published from 'master'." >&2
		exit 1
	fi

	# What is published must match a commit of this repository.
	if [ -n "$(git status --porcelain)" ]; then
		echo "Uncommitted changes: commit or stash them first." >&2
		exit 1
	fi

	# What is published must be on GitHub too, not only on this machine.
	git fetch --quiet origin master
	if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/master)" ]; then
		echo "'master' differs from 'origin/master': push (or pull) first." >&2
		exit 1
	fi

	# The build must look like the site: publishing an empty or partial
	# folder would delete the site, and without CNAME the domain is lost.
	for file in index.html atom.xml feed.json CNAME; do
		if [ ! -s "public/$file" ]; then
			echo "public/$file is missing or empty: nothing was published." >&2
			exit 1
		fi
	done

	revision=$(git rev-parse --short HEAD)
	checkout=$(mktemp -d)
	trap 'rm -rf "$checkout"' EXIT

	# 1. Get the published repository (its last commit is enough).
	git clone --quiet --depth 1 {{deploy_repository}} "$checkout"

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

# Delete what the build generates.
clean:
	rm -rf public
	rm -rf resources
