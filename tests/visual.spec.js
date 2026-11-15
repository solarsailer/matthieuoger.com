import { expect, test } from "@playwright/test"

import {
  ALL_WIDTHS,
  MAIN_WIDTHS,
  PAGES,
  REPRESENTATIVE_PAGES,
  slugify
} from "./pages"

// -------------------------------------------------------------
// Visual: every page looks like its reference screenshot.
//
// References are recorded with `just snapshots`, from a state of the
// site that is known to be good (they are not in the repository).
// -------------------------------------------------------------

function widthsFor(url) {
  return REPRESENTATIVE_PAGES.includes(url) ? ALL_WIDTHS : MAIN_WIDTHS
}

for (const url of [...new Set([...PAGES, ...REPRESENTATIVE_PAGES])]) {
  for (const width of widthsFor(url)) {
    test(`${url} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(url, { waitUntil: "load" })
      await page.evaluate(() => document.fonts.ready)

      await expect(page).toHaveScreenshot(`${slugify(url)}-${width}.png`, {
        fullPage: true,
        mask: [page.locator("video, iframe")]
      })
    })
  }
}
