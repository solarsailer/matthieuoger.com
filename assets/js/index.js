import { computePosition, offset, shift } from "@floating-ui/dom"

// -------------------------------------------------------------
// Tooltips.
//
// A tooltip is the element that follows a link (see tooltip.html).
// It is displayed above the link when the link is hovered or focused.
// -------------------------------------------------------------

// Distance between the center of the link and the tooltip
// (the stylesheet then moves the tooltip 10px further when it opens).
const DISTANCE = 20

// Too close to the top of the screen, the tooltip is displayed below.
const TOP_LIMIT = 100

async function show(link, tooltip) {
  const isNearTop = link.getBoundingClientRect().top < TOP_LIMIT
  const placement = isNearTop ? "bottom" : "top"

  // The tooltip must be displayed to be measured.
  tooltip.classList.add("is-visible")

  const { x, y } = await computePosition(link, tooltip, {
    placement,
    middleware: [
      offset(({ rects }) => DISTANCE - rects.reference.height / 2),
      shift({ padding: 8 })
    ]
  })

  tooltip.dataset.placement = placement
  tooltip.style.left = `${x}px`
  tooltip.style.top = `${y}px`

  tooltip.classList.add("is-opened")
}

function hide(tooltip) {
  tooltip.classList.remove("is-opened")
}

for (const tooltip of document.querySelectorAll(".tooltip")) {
  const link = tooltip.previousElementSibling

  link.addEventListener("pointerenter", () => show(link, tooltip))
  link.addEventListener("focus", () => show(link, tooltip))

  link.addEventListener("pointerleave", () => hide(tooltip))
  link.addEventListener("blur", () => hide(tooltip))

  // Once faded out, the tooltip is removed from the layout.
  tooltip.addEventListener("transitionend", () => {
    if (!tooltip.classList.contains("is-opened")) {
      tooltip.classList.remove("is-visible")
    }
  })
}
