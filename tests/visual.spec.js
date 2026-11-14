import { expect, test } from "@playwright/test"

import {
  ALL_WIDTHS,
  MAIN_WIDTHS,
  PAGES,
  REPRESENTATIVE_PAGES,
  VISUAL_DIFFERENCES,
  hugoUrl,
  slugify
} from "./pages"

// -------------------------------------------------------------
// Visual: same pixels as production.
//
// Reference screenshots are recorded from the Gatsby build with
// `just baseline`, then compared with the Hugo build by `just test`.
// -------------------------------------------------------------

// Gatsby animates the social links of the home page with JavaScript
// (up to 250ms of delay + 2000ms of duration): wait for the end.
const HOME_ANIMATION = 2500

async function open(page, url, width, isBaseline) {
  // No analytics during tests.
  await page.route(/google-analytics\.com/, (route) => route.abort())

  await page.setViewportSize({ width, height: 900 })
  await page.goto(isBaseline ? url : hugoUrl(url), { waitUntil: "load" })
  await page.evaluate(() => document.fonts.ready)

  if (isBaseline && url === "/") await page.waitForTimeout(HOME_ANIMATION)
}

// D14: on the articles pages, the "Articles" menu button is highlighted.
// It never was in production, because of a bug.
function articlesButton(page, url) {
  if (!url.startsWith("/articles/")) return []

  return [page.locator("#page_header li:nth-child(2)")]
}

function widthsFor(url) {
  return REPRESENTATIVE_PAGES.includes(url) ? ALL_WIDTHS : MAIN_WIDTHS
}

for (const url of [...new Set([...PAGES, ...REPRESENTATIVE_PAGES])]) {
  for (const width of widthsFor(url)) {
    test(`${url} at ${width}px`, async ({ page }, testInfo) => {
      const isBaseline = testInfo.project.name === "baseline"
      const difference =
        VISUAL_DIFFERENCES[url] ?? VISUAL_DIFFERENCES[`${url}@${width}`]

      test.fail(!isBaseline && Boolean(difference), difference)

      await open(page, url, width, isBaseline)

      await expect(page).toHaveScreenshot(`${slugify(url)}-${width}.png`, {
        fullPage: true,
        mask: [
          page.locator("video, iframe"),
          page.locator("#page_footer > p"), // D9: the copyright year changes.
          ...articlesButton(page, url)
        ]
      })
    })
  }
}
