import { readdirSync } from "node:fs"
import { join, relative, sep } from "node:path"

// -------------------------------------------------------------
// The site under test: the production build (`just build`),
// served locally by serve.mjs.
// -------------------------------------------------------------

export const SITE_URL = "http://localhost:8000"
export const SITE_DIR = join(__dirname, "..", "public")

// -------------------------------------------------------------
// Pages.
// -------------------------------------------------------------

function findPages(directory) {
  const urls = []

  for (const entry of readdirSync(directory, {
    recursive: true,
    withFileTypes: true
  })) {
    if (entry.name !== "index.html") continue

    const path = relative(directory, entry.parentPath).split(sep).join("/")
    urls.push(path ? `/${path}/` : "/")
  }

  return urls.sort()
}

function safeFindPages(directory) {
  try {
    return findPages(directory)
  } catch {
    return []
  }
}

// Every page of the site.
// '/articles/p/1/' is only a redirect to '/articles/', created by the paginator.
export const PAGES = safeFindPages(SITE_DIR).filter(
  (x) => x !== "/articles/p/1/"
)

// Pages that cover every layout and every content feature.
export const REPRESENTATIVE_PAGES = [
  "/",
  "/articles/",
  "/articles/p/2/",
  "/archive/",
  "/about/", // Page title variant, special links.
  "/404.html",
  "/2018/10/unity-iphone-x-home-indicator/", // tl;dr, footnotes, videos, images.
  "/2015/09/rule-of-two/", // Transcripts, highlights.
  "/2013/08/quote-jonathan-blow/", // Tweet.
  "/2015/09/semicolon-comma-programming/", // Code (Go, Swift), image.
  "/2023/02/alpha-value-css-color-properties/", // Code (CSS).
  "/2023/06/date-formats/", // Nested lists, inline code.
  "/2022/03/rotation-videos/", // Ordered lists, sized images.
  "/2013/09/microsoft-out/", // Titles with '.more'.
  "/2014/06/design-detail-ios8-messages/" // Images with a caption.
]

// Viewport widths, chosen to sit between the breakpoints of the site:
// 1600, 900, 800, 750, 700, 650, 600, 525, 500, 450, 400, 350, 300.
export const MAIN_WIDTHS = [1280, 375]
export const ALL_WIDTHS = [1700, 1280, 850, 680, 560, 480, 375, 320]

// Opens a page and waits until it is ready for a screenshot: fonts come
// from the network (Google Fonts) and are only requested once the page
// is laid out, so "loaded" is not enough.
export async function open(page, url, width) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto(url, { waitUntil: "load" })

  await page.waitForFunction(
    () =>
      document.fonts.status === "loaded" &&
      [...document.fonts].some((font) => font.status === "loaded")
  )
}

// '/2015/09/rule-of-two/' → '2015-09-rule-of-two'.
export function slugify(url) {
  return url.replace(/^\/|\/$/g, "").replace(/[/.]/g, "-") || "home"
}
