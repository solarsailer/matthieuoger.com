import { expect, test } from "@playwright/test"

import { extractBody, extractHead } from "./extract"
import {
  BASELINE_URL,
  HUGO_URL,
  IGNORED_LINES,
  PAGES,
  REWRITTEN_PAGES,
  UNORDERED_PAGES,
  flatten,
  hugoUrl
} from "./pages"

// -------------------------------------------------------------
// Content: same structure, text, links and metadata as production.
// -------------------------------------------------------------

// The comparison is on the generated HTML, not on what scripts do with it.
test.use({ javaScriptEnabled: false })

// `name` is the production URL of the page, used to look up exceptions.
async function extract(page, url, name) {
  await page.goto(url, { waitUntil: "domcontentloaded" })

  const ignored = IGNORED_LINES[name]

  const clean = (outline) => {
    const lines = outline.split("\n").filter((x) => !ignored?.test(x))
    if (UNORDERED_PAGES.includes(name)) lines.sort()

    const result = lines.join("\n")
    return REWRITTEN_PAGES.includes(name) ? flatten(result) : result
  }

  return {
    head: clean(await page.evaluate(extractHead)),
    body: clean(await page.evaluate(extractBody, "#page"))
  }
}

for (const url of [...PAGES, "/404.html"]) {
  test(`content of ${url}`, async ({ page }) => {
    const expected = await extract(page, BASELINE_URL + url, url)
    const actual = await extract(page, HUGO_URL + hugoUrl(url), url)

    expect.soft(actual.head).toBe(expected.head)
    expect.soft(actual.body).toBe(expected.body)
  })
}
