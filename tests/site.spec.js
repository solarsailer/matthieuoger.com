import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { expect, test } from "@playwright/test"

import { PAGES, SITE_DIR } from "./pages"

// -------------------------------------------------------------
// The build: expected files, and no broken link.
// -------------------------------------------------------------

const ROOT_FILES = [
  "index.html",
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

// URLs that readers and other sites link to: they must keep working.
const PERMANENT_PAGES = [
  "/about/",
  "/articles/",
  "/archive/",
  "/2013/06/a-start/",
  "/2018/10/unity-iphone-x-home-indicator/",
  "/2023/06/date-formats/"
]

for (const file of ROOT_FILES) {
  test(`/${file} exists`, () => {
    expect(existsSync(join(SITE_DIR, file))).toBe(true)
  })
}

test("the pages that are linked from elsewhere exist", () => {
  expect(PAGES).toEqual(expect.arrayContaining(PERMANENT_PAGES))
})

test("every local link and media resolves", async ({ request }) => {
  test.slow()

  const targets = new Map()

  for (const page of PAGES) {
    const html = readFileSync(join(SITE_DIR, page, "index.html"), "utf8")

    for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^([a-z]+:|#)/.test(value)) continue

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
