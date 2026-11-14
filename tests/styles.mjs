// Debug helper: compare the computed styles of an element on both sites.
// Usage: node tests/styles.mjs <url> <baseline selector> <hugo selector> [width] [pseudo]
// Both servers must be running (ports 8001 and 8000).

import { chromium } from "@playwright/test"

const [url, baselineSelector, hugoSelector, width = "1280", pseudo] =
  process.argv.slice(2)

async function read(page, origin, selector) {
  await page.goto(origin + url, { waitUntil: "load" })
  await page.evaluate(() => document.fonts.ready)

  return page.evaluate(
    ([selector, pseudo]) => {
      const element = document.querySelector(selector)
      if (!element) return null

      const style = getComputedStyle(element, pseudo || null)
      const result = {}
      for (const name of style) result[name] = style.getPropertyValue(name)

      const box = element.getBoundingClientRect()
      result["(box)"] = [box.x, box.y, box.width, box.height]
        .map((x) => Math.round(x * 100) / 100)
        .join(" ")

      return result
    },
    [selector, pseudo]
  )
}

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: Number(width), height: 900 }
})

const baseline = await read(page, "http://localhost:8001", baselineSelector)
const hugo = await read(page, "http://localhost:8000", hugoSelector)
await browser.close()

if (!baseline || !hugo) {
  console.log("Not found:", !baseline ? "baseline" : "", !hugo ? "hugo" : "")
  process.exit(1)
}

for (const name of Object.keys(baseline)) {
  if (baseline[name] === hugo[name]) continue
  if (name.startsWith("--")) continue

  console.log(
    `${name}\n  baseline: ${baseline[name]}\n  hugo:     ${hugo[name]}`
  )
}
