import { expect, test } from "@playwright/test"

// -------------------------------------------------------------
// Interactions: same hover states and tooltips as production.
//
// Like visual.spec.js, references are recorded from the Gatsby build.
// Selectors only use what both builds have in common (ids and tags).
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
  { name: "page-title", url: "/articles/2/", target: "#page_content h1 a" },
  {
    name: "pagination",
    url: "/articles/2/",
    target: "#page_content h1 + div a"
  },
  { name: "post-recap", url: "/articles/2/", target: "#page_content ul li a" },
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

// Time for scripted animations and tooltips to settle.
const SETTLE = 2500

for (const { name, url, target, width = 1280 } of CASES) {
  test(`hover: ${name}`, async ({ page }) => {
    await page.route(/google-analytics\.com/, (route) => route.abort())

    await page.setViewportSize({ width, height: 900 })
    await page.goto(url, { waitUntil: "load" })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(url === "/" ? SETTLE : 250)

    const element = page.locator(target).first()
    await element.scrollIntoViewIfNeeded()
    await element.hover()
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot(`hover-${name}.png`, {
      mask: [page.locator("#page_footer > p")] // D9: the copyright year.
    })
  })
}
