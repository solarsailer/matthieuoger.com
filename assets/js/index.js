// -------------------------------------------------------------
// Tooltips.
//
// A tooltip is the popover that follows a link (see tooltip.html).
// It is displayed above the link while the link is hovered with a mouse,
// or focused with the keyboard. The browser handles the rest (top layer);
// see tooltip.scss for the look and the animation.
// -------------------------------------------------------------

// Distance between the center of the link and the tooltip
// (the stylesheet then moves the tooltip 10px further when it opens).
const DISTANCE = 20

// Too close to the top of the screen, the tooltip is displayed below.
const TOP_LIMIT = 100

// Minimal distance with the edges of the screen.
const MARGIN = 8

function isOpen(tooltip) {
  return tooltip.matches(":popover-open")
}

function place(link, tooltip) {
  const target = link.getBoundingClientRect()

  // The size, without the animation (which moves the tooltip).
  const width = tooltip.offsetWidth
  const height = tooltip.offsetHeight

  const isBelow = target.top < TOP_LIMIT
  const gap = DISTANCE - target.height / 2

  // Centered on the link, but always inside the screen.
  const center = target.left + target.width / 2 - width / 2
  const maximum = document.documentElement.clientWidth - width - MARGIN
  const left = Math.max(MARGIN, Math.min(center, maximum))

  const top = isBelow ? target.bottom + gap : target.top - height - gap

  // The tooltip is positioned in the page: it follows the link on scroll.
  tooltip.style.left = `${left + window.scrollX}px`
  tooltip.style.top = `${top + window.scrollY}px`
  tooltip.dataset.placement = isBelow ? "bottom" : "top"
}

function show(link, tooltip) {
  // Opening an open popover is an error.
  if (!isOpen(tooltip)) tooltip.showPopover()

  place(link, tooltip)
}

function hide(tooltip) {
  if (isOpen(tooltip)) tooltip.hidePopover()
}

function connect(link, tooltip) {
  // A tooltip stays as long as one of the two reasons to show it remains.
  const isHovered = () => link.matches(":hover")
  const isFocused = () => link.matches(":focus-visible")

  link.addEventListener("pointerenter", (event) => {
    // A finger does not hover: a tap follows the link right away.
    if (event.pointerType !== "touch") show(link, tooltip)
  })

  link.addEventListener("pointerleave", () => {
    if (!isFocused()) hide(tooltip)
  })

  link.addEventListener("focus", () => {
    if (isFocused()) show(link, tooltip)
  })

  link.addEventListener("blur", () => {
    if (!isHovered()) hide(tooltip)
  })
}

// Without the Popover API (browsers older than 2024), no tooltip.
if ("popover" in HTMLElement.prototype) {
  const tooltips = [...document.querySelectorAll(".tooltip")]

  for (const tooltip of tooltips) {
    connect(tooltip.previousElementSibling, tooltip)
  }

  const hideAll = () => tooltips.forEach(hide)

  // A tooltip must be dismissable without moving the pointer or the focus.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideAll()
  })

  // Its position is computed once: it is wrong after a resize.
  window.addEventListener("resize", hideAll)

  // Nothing must be left open in a page restored from the history.
  window.addEventListener("pagehide", hideAll)
}
