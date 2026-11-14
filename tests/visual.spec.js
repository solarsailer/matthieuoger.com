import { expect, test } from "@playwright/test"

import {
  ALL_WIDTHS,
  MAIN_WIDTHS,
  PAGES,
  REPRESENTATIVE_PAGES,
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
  await page.goto(url, { waitUntil: "load" })
  await page.evaluate(() => document.fonts.ready)

  if (isBaseline && url === "/") await page.waitForTimeout(HOME_ANIMATION)
}

function widthsFor(url) {
  return REPRESENTATIVE_PAGES.includes(url) ? ALL_WIDTHS : MAIN_WIDTHS
}

for (const url of [...new Set([...PAGES, ...REPRESENTATIVE_PAGES])]) {
  for (const width of widthsFor(url)) {
    test(`${url} at ${width}px`, async ({ page }, testInfo) => {
      await open(page, url, width, testInfo.project.name === "baseline")

      await expect(page).toHaveScreenshot(`${slugify(url)}-${width}.png`, {
        fullPage: true,
        mask: [page.locator("video, iframe")]
      })
    })
  }
}
