import { expect, test } from "@playwright/test"

import { extractBody, extractHead } from "./extract"
import {
  BASELINE_URL,
  HUGO_URL,
  IGNORED_LINES,
  PAGES,
  UNORDERED_PAGES
} from "./pages"

// -------------------------------------------------------------
// Content: same structure, text, links and metadata as production.
// -------------------------------------------------------------

// The comparison is on the generated HTML, not on what scripts do with it.
test.use({ javaScriptEnabled: false })

async function extract(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" })

  const { pathname } = new URL(url)
  const ignored = IGNORED_LINES[pathname]

  const clean = (outline) => {
    const lines = outline.split("\n").filter((x) => !ignored?.test(x))
    if (UNORDERED_PAGES.includes(pathname)) lines.sort()

    return lines.join("\n")
  }

  return {
    head: clean(await page.evaluate(extractHead)),
    body: clean(await page.evaluate(extractBody, "#page"))
  }
}

for (const url of [...PAGES, "/404.html"]) {
  test(`content of ${url}`, async ({ page }) => {
    const expected = await extract(page, BASELINE_URL + url)
    const actual = await extract(page, HUGO_URL + url)

    expect.soft(actual.head).toBe(expected.head)
    expect.soft(actual.body).toBe(expected.body)
  })
}
