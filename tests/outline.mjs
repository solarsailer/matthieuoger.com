// Debug helper: print the normalized outline of a page.
// Usage: node tests/outline.mjs <baseline|hugo> <url> [head]

import { chromium } from "@playwright/test"

const [site, url, part] = process.argv.slice(2)
const origin =
  site === "baseline" ? "http://localhost:8001" : "http://localhost:8000"

// extract.js is written for Playwright's loader: import it as text.
import { readFileSync } from "node:fs"
const source = readFileSync(new URL("./extract.js", import.meta.url), "utf8")
const extract = await import(
  "data:text/javascript," + encodeURIComponent(source)
)

const browser = await chromium.launch()
const page = await browser.newPage({ javaScriptEnabled: false })
await page.goto(origin + url, { waitUntil: "domcontentloaded" })

console.log(
  part === "head"
    ? await page.evaluate(extract.extractHead)
    : await page.evaluate(extract.extractBody, "#page")
)

await browser.close()
