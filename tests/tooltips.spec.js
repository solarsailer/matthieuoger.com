import { expect, test } from "@playwright/test"

// -------------------------------------------------------------
// Tooltips: behavior, in every browser engine.
//
// Unlike the other specs, nothing is compared with production here:
// these are the rules the tooltips must follow (see assets/js/index.js).
// -------------------------------------------------------------

const POST = "/2013/06/a-start/"
const MARGIN = 8

const link = (page, index) =>
  page.locator(`#page_footer li:nth-child(${index}) a`)
const tooltip = (page, index) =>
  page.locator(`#page_footer li:nth-child(${index}) .tooltip`)

async function open(page, { width = 1280, height = 900 } = {}) {
  const errors = []
  page.on("pageerror", (error) => errors.push(error.message))

  await page.setViewportSize({ width, height })
  await page.goto(POST)

  // Links of the footer go to other sites: never leave the page.
  await page.evaluate(() => {
    document.addEventListener("click", (event) => event.preventDefault())
  })

  await link(page, 1).scrollIntoViewIfNeeded()

  return errors
}

// Position of the tooltip relative to its link, once the animation is over.
async function geometry(page, index) {
  await page.waitForTimeout(400)

  const target = await link(page, index).boundingBox()
  const box = await tooltip(page, index).boundingBox()
  const viewport = page.viewportSize()

  return {
    isAbove: box.y + box.height <= target.y,
    isBelow: box.y >= target.y + target.height,
    gap: Math.round(
      box.y >= target.y
        ? box.y - (target.y + target.height)
        : target.y - (box.y + box.height)
    ),
    offCenter: Math.abs(box.x + box.width / 2 - (target.x + target.width / 2)),
    left: box.x,
    right: viewport.width - (box.x + box.width)
  }
}

test("a tooltip opens above its link on hover, and closes after", async ({
  page
}) => {
  const errors = await open(page)

  await expect(tooltip(page, 1)).toBeHidden()

  await link(page, 1).hover()
  await expect(tooltip(page, 1)).toBeVisible()
  await expect(tooltip(page, 1)).toHaveText("Twitter")

  const position = await geometry(page, 1)
  expect(position.isAbove).toBe(true)
  expect(position.gap).toBeGreaterThanOrEqual(10)
  expect(position.gap).toBeLessThanOrEqual(14)
  expect(position.offCenter).toBeLessThan(1)

  await page.mouse.move(5, 5)
  await expect(tooltip(page, 1)).toBeHidden()

  expect(errors).toEqual([])
})

test("only one tooltip is open at a time", async ({ page }) => {
  await open(page)

  await link(page, 1).hover()
  await link(page, 2).hover()

  await expect(tooltip(page, 2)).toBeVisible()
  await expect(tooltip(page, 1)).toBeHidden()
})

test("a tooltip opens below a link that is near the top of the screen", async ({
  page
}) => {
  await open(page)

  // The footer is at the end of the page: add room under it,
  // then scroll until its icons are just under the top of the screen.
  await link(page, 1).evaluate((element) => {
    document.body.style.paddingBottom = "100vh"
    window.scrollBy(0, element.getBoundingClientRect().top - 40)
  })

  await link(page, 1).hover()
  await expect(tooltip(page, 1)).toBeVisible()

  const position = await geometry(page, 1)
  expect(position.isBelow).toBe(true)
  expect(position.gap).toBeGreaterThanOrEqual(10)
  expect(position.gap).toBeLessThanOrEqual(14)
})

test("scrolling away from a hovered link closes its tooltip", async ({
  page
}) => {
  await open(page, { height: 400 })

  await link(page, 1).hover()
  await expect(tooltip(page, 1)).toBeVisible()

  // The pointer does not move, the link does.
  await page.mouse.wheel(0, -200)
  await page.mouse.move(641, 300)
  await expect(tooltip(page, 1)).toBeHidden()
})

test("a tooltip follows its focused link when the page scrolls", async ({
  page,
  browserName
}) => {
  await open(page, { height: 400 })

  await link(page, 1).focus()
  await page.keyboard.press(
    browserName === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab"
  )
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab")
  await expect(tooltip(page, 1)).toBeVisible()

  const before = await geometry(page, 1)

  await page.evaluate(() => window.scrollBy(0, -40))
  const after = await geometry(page, 1)

  expect(after.gap).toBe(before.gap)
  expect(after.offCenter).toBeLessThan(1)
})

test("tooltips stay inside a narrow screen", async ({ page }) => {
  await open(page, { width: 320 })

  // Show the whole footer, so that nothing scrolls between two icons.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

  for (let index = 1; index <= 7; index++) {
    await link(page, index).hover()
    await expect(tooltip(page, index)).toBeVisible()

    const position = await geometry(page, index)
    expect(position.left, `tooltip ${index}`).toBeGreaterThanOrEqual(MARGIN - 1)
    expect(position.right, `tooltip ${index}`).toBeGreaterThanOrEqual(
      MARGIN - 1
    )
  }
})

test("a tooltip opens on keyboard focus, and Escape closes it", async ({
  page,
  browserName
}) => {
  const errors = await open(page)

  // Safari only moves the focus to links with the Option key.
  const tab = browserName === "webkit" ? "Alt+Tab" : "Tab"
  const back = browserName === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab"

  await link(page, 1).focus()
  // Focus set by a script is not "visible" in every engine: use the keyboard.
  await page.keyboard.press(back)
  await page.keyboard.press(tab)

  await expect(link(page, 1)).toBeFocused()
  await expect(tooltip(page, 1)).toBeVisible()

  await page.keyboard.press("Escape")
  await expect(tooltip(page, 1)).toBeHidden()

  // Moving the focus shows the next one, and hides it when leaving.
  await page.keyboard.press(tab)
  await expect(tooltip(page, 2)).toBeVisible()

  await page.keyboard.press(back)
  await expect(tooltip(page, 2)).toBeHidden()
  await expect(tooltip(page, 1)).toBeVisible()

  expect(errors).toEqual([])
})

test("hovering then clicking a link raises no error", async ({ page }) => {
  const errors = await open(page)

  await link(page, 1).hover()
  await link(page, 1).click({ noWaitAfter: true })
  await page.mouse.move(5, 5)
  await link(page, 1).hover()

  await expect(tooltip(page, 1)).toBeVisible()
  expect(errors).toEqual([])
})

test("on the home page, tooltips are for small screens only", async ({
  page
}) => {
  await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort())

  const social = page.locator(".social-nav li:nth-child(2)")

  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto("/")
  await social.locator("a").hover()
  await expect(social.locator(".tooltip")).toBeHidden()

  await page.setViewportSize({ width: 700, height: 900 })
  await page.mouse.move(5, 5)
  await social.locator("a").hover()
  await expect(social.locator(".tooltip")).toBeVisible()
})
