import { execSync } from "node:child_process"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

import { expect, test } from "@playwright/test"

import {
  APPROVED_POST_EDITS,
  HUGO_DIR,
  HUGO_PAGES,
  PAGES,
  POSTS_REFERENCE_COMMIT,
  hugoUrl
} from "./pages"

// -------------------------------------------------------------
// URLs and files: what production serves, Hugo must serve.
// -------------------------------------------------------------

const ROOT_FILES = [
  "404.html",
  "atom.xml",
  "feed.json",
  "sitemap.xml",
  "CNAME",
  "favicon.ico",
  "favicon.svg",
  "feed.png",
  "apple-touch-icon.png"
]

test("the baseline is available", () => {
  expect(PAGES.length, "run `just baseline` first").toBeGreaterThanOrEqual(100)
})

test("every production page exists", () => {
  const missing = PAGES.filter((x) => !HUGO_PAGES.includes(hugoUrl(x)))

  expect(missing).toEqual([])
})

test("no unexpected page is generated", () => {
  const expected = PAGES.map(hugoUrl)

  // '/articles/p/1/' is a redirect to '/articles/' created by the paginator.
  const extra = HUGO_PAGES.filter(
    (x) => !expected.includes(x) && x !== "/articles/p/1/"
  )

  expect(extra).toEqual([])
})

for (const file of ROOT_FILES) {
  test(`/${file} exists`, () => {
    expect(existsSync(join(HUGO_DIR, file))).toBe(true)
  })
}

test("no markdown container is left unrendered", () => {
  const leftovers = readdirSync(HUGO_DIR, { recursive: true })
    .filter((x) => /\.(html|xml|json)$/.test(x))
    .filter((x) => readFileSync(join(HUGO_DIR, x), "utf8").includes(":::"))

  expect(leftovers).toEqual([])
})

test("every local link and media resolves", async ({ request }) => {
  test.slow()

  const targets = new Map()

  for (const page of HUGO_PAGES) {
    const html = readFileSync(join(HUGO_DIR, page, "index.html"), "utf8")

    for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|#|data:)/.test(value)) continue

      const url = new URL(value, `http://localhost${page}`)
      targets.set(url.pathname, page)
    }
  }

  const broken = []

  for (const [path, page] of targets) {
    const response = await request.get(path)
    if (!response.ok()) broken.push(`${path} (in ${page})`)
  }

  expect(broken).toEqual([])
})

// -------------------------------------------------------------
// Posts are written by a human: they must not change (MIGRATION.md §2).
// -------------------------------------------------------------

test("posts are untouched, except approved edits", () => {
  const changed = execSync(
    `git diff --name-only ${POSTS_REFERENCE_COMMIT} -- content/posts`,
    { encoding: "utf8" }
  )
    .split("\n")
    .filter(Boolean)

  expect(changed.sort()).toEqual([...APPROVED_POST_EDITS].sort())
})
