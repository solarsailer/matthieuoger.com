// -------------------------------------------------------------
// Tooltips.
//
// A tooltip is the popover that follows a link (see tooltip.html).
// It is displayed above the link when the link is hovered or focused.
// The browser handles the rest (top layer, see tooltip.scss for the look).
// -------------------------------------------------------------

// Distance between the center of the link and the tooltip
// (the stylesheet then moves the tooltip 10px further when it opens).
const DISTANCE = 20

// Too close to the top of the screen, the tooltip is displayed below.
const TOP_LIMIT = 100

// Minimal distance with the edges of the screen.
const MARGIN = 8

function show(link, tooltip) {
  tooltip.showPopover()

  const target = link.getBoundingClientRect()
  const { width, height } = tooltip.getBoundingClientRect()

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

function hide(tooltip) {
  tooltip.hidePopover()
}

// Without the Popover API (browsers older than 2024), no tooltip.
if ("popover" in HTMLElement.prototype) {
  for (const tooltip of document.querySelectorAll(".tooltip")) {
    const link = tooltip.previousElementSibling

    link.addEventListener("pointerenter", () => show(link, tooltip))
    link.addEventListener("focus", () => show(link, tooltip))

    link.addEventListener("pointerleave", () => hide(tooltip))
    link.addEventListener("blur", () => hide(tooltip))
  }
}
