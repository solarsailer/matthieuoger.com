// -------------------------------------------------------------
// Normalized view of a page.
//
// These functions run inside the browser (page.evaluate), on the Gatsby
// build and on the Hugo build. They return what must be identical between
// the two: tags, text, links, media and the classes written by hand in
// posts. Everything that is an implementation detail is left out.
// -------------------------------------------------------------

// Returns an indented outline (one line per element or text) of `selector`.
export function extractBody(selector) {
  // Classes that come from the content, not from the styling system.
  const AUTHOR_CLASSES = [
    "tldr",
    "transcript",
    "twitter-tweet",
    "more",
    "footnotes",
    "footnote-ref",
    "footnote-backref",
    "read-more-hint"
  ]

  // Wrappers without meaning: only their children are kept.
  const TRANSPARENT_TAGS = ["div", "span", "aside", "g"]

  const SKIPPED_TAGS = ["script", "style", "noscript", "template"]

  const MEDIA = /\.(png|jpe?g|gif|svg|mp4|mp3)$/

  function text(value) {
    return (
      value
        .replace(/[\ufe0e\ufe0f]/g, "") // Emoji/text variation selectors.
        .replace(/© \d{4}/, "© YEAR") // D9: the copyright year changes.
        // Only plain whitespace collapses: a non-breaking or a hair space
        // is part of the text.
        .replace(/[ \t\n\r]+/g, " ")
        .replace(/^ | $/g, "")
    )
  }

  function url(value) {
    if (!value) return value

    // Feeds use absolute URLs.
    value = value.replace(/^https:\/\/matthieuoger\.com(?=\/)/, "")

    // Footnotes: remark uses 'fn-1', Goldmark 'fn:1'.
    value = value.replace(/^#(fn|fnref)[:-]/, "#$1-")

    // D10: Gatsby links the title of 'About' to '/#' (the home page).
    // Hugo links it to the page itself, like the other page titles.
    if (value === "/#") return location.pathname

    // D3: post assets moved next to their post.
    // '/images/posts/2018-10-18/a.jpg', '/images/posts/2014-06-03-a.png'
    // and 'a.jpg' are all compared as 'a.jpg'. Gatsby also adds a hash
    // to the files it bundles ('avatar-<hash>.jpg').
    if (MEDIA.test(value) && !/^https?:/.test(value)) {
      return value
        .split("/")
        .pop()
        .replace(/^\d{4}-\d{2}-\d{2}-/, "")
        .replace(/-[0-9a-f]{32}\./, ".")
    }

    // '/articles/2' and '/articles/2/' are the same page.
    if (
      value.startsWith("/") &&
      !value.endsWith("/") &&
      !/\.\w+$/.test(value)
    ) {
      return value + "/"
    }

    return value
  }

  function describe(element) {
    const tag = element.tagName.toLowerCase()
    const attributes = []

    const classes = AUTHOR_CLASSES.filter((x) => element.classList.contains(x))
    if (classes.length) attributes.push(`class="${classes.join(" ")}"`)

    for (const name of ["href", "src"]) {
      if (element.hasAttribute(name)) {
        attributes.push(`${name}="${url(element.getAttribute(name))}"`)
      }
    }

    for (const name of ["alt", "title", "start", "target", "viewBox"]) {
      if (element.hasAttribute(name)) {
        attributes.push(`${name}="${element.getAttribute(name)}"`)
      }
    }

    return [tag, ...attributes].join(" ")
  }

  // D6: remark puts the "back" link of a footnote after its text,
  // Goldmark inside. Same link, different place: not compared.
  function isFootnoteBackLink(element) {
    return element.classList.contains("footnote-backref")
  }

  function isTooltip(element) {
    return (
      element.classList.contains("tooltip") ||
      element.getAttribute("role") === "tooltip"
    )
  }

  function isTransparent(element) {
    const tag = element.tagName.toLowerCase()

    // D11: remark decided item by item whether the text of a list item is
    // wrapped in a paragraph, Goldmark (CommonMark) decides list by list.
    if (tag === "p" && element.parentElement.tagName === "LI") return true

    if (!TRANSPARENT_TAGS.includes(tag)) return false

    return !AUTHOR_CLASSES.some((x) => element.classList.contains(x))
  }

  // Consecutive pieces of text are merged: how a sentence is split
  // into text nodes and <span> is an implementation detail.
  let pending = null

  function flush(lines) {
    if (!pending) return

    const value = text(pending.value)
    if (value) lines.push("  ".repeat(pending.depth) + JSON.stringify(value))

    pending = null
  }

  function walk(node, depth, lines) {
    const indent = "  ".repeat(depth)

    if (node.nodeType === Node.TEXT_NODE) {
      if (pending && pending.depth !== depth) flush(lines)

      pending ??= { depth, value: "" }
      pending.value += node.textContent
      return
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return

    const tag = node.tagName.toLowerCase()
    if (SKIPPED_TAGS.includes(tag)) return
    if (isTooltip(node) || isFootnoteBackLink(node)) return

    if (isTransparent(node)) {
      for (const child of node.childNodes) walk(child, depth, lines)
      return
    }

    flush(lines)
    lines.push(indent + describe(node))

    // Code blocks: the highlighters produce different tokens,
    // only the code itself must be the same.
    if (tag === "pre") {
      lines.push(indent + "  " + JSON.stringify(node.textContent.trim()))
      return
    }

    // Icons: the drawing is not compared.
    if (tag === "svg") return

    for (const child of node.childNodes) walk(child, depth + 1, lines)
    flush(lines)
  }

  const lines = []
  const root = document.querySelector(selector)

  if (root) {
    for (const child of root.childNodes) walk(child, 0, lines)
    flush(lines)
  }

  return lines.join("\n")
}

// Returns what matters in <head>, as sorted lines.
export function extractHead() {
  const IGNORED_META = ["viewport", "generator"]
  const LINK_RELS = ["alternate", "shortcut icon", "icon", "mask-icon"]

  const lines = []

  lines.push(`title: ${document.title}`)
  lines.push(`layout: ${document.documentElement.dataset.layout ?? ""}`)

  for (const meta of document.querySelectorAll("meta[name], meta[property]")) {
    const name = meta.getAttribute("name") ?? meta.getAttribute("property")
    if (IGNORED_META.includes(name)) continue

    lines.push(`meta ${name}: ${meta.getAttribute("content")}`)
  }

  for (const link of document.querySelectorAll("link[rel]")) {
    const rel = link.getAttribute("rel")
    const href = link.getAttribute("href")

    if (LINK_RELS.includes(rel)) {
      lines.push(`link ${rel}: ${href} ${link.getAttribute("type") ?? ""}`)
    }

    if (rel === "stylesheet" && href.includes("fonts.googleapis.com")) {
      lines.push(`fonts: ${href}`)
    }
  }

  return lines.sort().join("\n")
}
