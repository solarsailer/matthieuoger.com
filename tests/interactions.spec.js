import { expect, test } from "@playwright/test"

import { open } from "./pages"

// -------------------------------------------------------------
// Interactions: hover states and tooltips look like their reference
// screenshot (recorded with `just snapshots`, like visual.spec.js).
// -------------------------------------------------------------

const POST = "/2018/10/unity-iphone-x-home-indicator/"

const CASES = [
  // Header.
  { name: "menu-button", url: POST, target: "#page_header li:nth-child(2) a" },
  {
    name: "menu-button-rss",
    url: POST,
    target: "#page_header li:nth-child(3) a"
  },
  { name: "site-title", url: POST, target: "#page_header h1 a" },

  // Post.
  { name: "post-title", url: POST, target: "#page_content article h1 a" },
  { name: "body-link", url: POST, target: "#page_content article p a" },
  { name: "footnote-ref", url: POST, target: "#page_content sup a" },
  { name: "post-date", url: POST, target: "#page_content article footer a" },

  // Lists.
  { name: "page-title", url: "/articles/p/2/", target: "#page_content h1 a" },
  {
    name: "pagination",
    url: "/articles/p/2/",
    target: "#page_content h1 + div a"
  },
  {
    name: "post-recap",
    url: "/articles/p/2/",
    target: "#page_content ul li a"
  },
  { name: "archive-recap", url: "/archive/", target: "#page_content ul li a" },

  // Footer, with its tooltips.
  { name: "footer-icon", url: POST, target: "#page_footer li:nth-child(1) a" },
  {
    name: "footer-icon-wide",
    url: POST,
    target: "#page_footer li:nth-child(6) a"
  },
  {
    name: "footer-icon-small",
    url: POST,
    target: "#page_footer li:nth-child(7) a",
    width: 375
  },
  { name: "copyright", url: POST, target: "#page_footer p a" },

  // 404.
  {
    name: "not-found-button",
    url: "/404.html",
    target: "#page_content section li a"
  },

  // Home.
  {
    name: "home-button",
    url: "/",
    target: "#page_content ul:nth-of-type(1) li a"
  },
  { name: "home-bio-link", url: "/", target: "#page_content p a" },
  {
    name: "home-social",
    url: "/",
    target: "#page_content ul:nth-of-type(2) li:nth-child(2) a"
  },
  {
    name: "home-social-inline",
    url: "/",
    target: "#page_content ul:nth-of-type(2) li:nth-child(2) a",
    width: 1700
  },
  {
    name: "home-social-icon",
    url: "/",
    target: "#page_content ul:nth-of-type(2) li:nth-child(6) a",
    width: 700
  },
  {
    name: "home-social-grid",
    url: "/",
    target: "#page_content ul:nth-of-type(2) li:nth-child(1) a",
    width: 375
  }
]

for (const { name, url, target, width = 1280 } of CASES) {
  test(`hover: ${name}`, async ({ page }) => {
    await open(page, url, width)

    // On the home page, links appear one after the other (up to 2.25s).
    if (url === "/") await page.waitForTimeout(2500)

    const element = page.locator(target).first()
    await element.scrollIntoViewIfNeeded()
    await element.hover()

    // Time for the tooltip to be placed, and for the hover state to settle.
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot(`hover-${name}.png`)
  })
}
