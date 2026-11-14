import { readFileSync } from "node:fs"
import { join } from "node:path"

import { expect, test } from "@playwright/test"

import { extractBody } from "./extract"
import { BASELINE_DIR, HUGO_DIR } from "./pages"

// -------------------------------------------------------------
// Feeds: same entries, same ids. Otherwise feed readers
// would show every old post as new.
// -------------------------------------------------------------

function read(directory, file) {
  return readFileSync(join(directory, file), "utf8")
}

function tag(xml, name) {
  return xml
    .match(new RegExp(`<${name}>([^<]*)</${name}>`))?.[1]
    .replace(/&apos;|&#39;/g, "'")
}

function links(xml) {
  return [...xml.matchAll(/<link ([^>]*)\/>/g)].map((x) => x[1].trim())
}

// D12: posts of the same day are not in the same order as in production.
// Entries are compared by date, then by id.
function byDateThenId(a, b) {
  const date = (x) => x.updated ?? x.date_published

  return date(b).localeCompare(date(a)) || a.id.localeCompare(b.id)
}

function parseAtom(xml) {
  const [header, ...entries] = xml.split("<entry>")

  return {
    xmlns: header.match(/<feed xmlns="([^"]*)"/)?.[1],
    id: tag(header, "id"),
    title: tag(header, "title"),
    icon: tag(header, "icon"),
    links: links(header),
    author: [tag(header, "name"), tag(header, "uri")],
    entries: entries
      .map((x) => ({
        id: tag(x, "id"),
        updated: tag(x, "updated"),
        title: tag(x, "title"),
        links: links(x),
        author: [tag(x, "name"), tag(x, "uri")],
        hasContent: /<content type="html"><!\[CDATA\[\s*\S/.test(x)
      }))
      .sort(byDateThenId)
  }
}

test("atom.xml has the same metadata and entries", () => {
  const expected = parseAtom(read(BASELINE_DIR, "atom.xml"))
  const actual = parseAtom(read(HUGO_DIR, "atom.xml"))

  expect(actual).toEqual(expected)
})

test("feed.json has the same metadata and items", () => {
  const withoutContent = (feed) => ({
    ...feed,
    items: feed.items
      .map(({ content_html, ...item }) => item)
      .sort(byDateThenId)
  })

  const expected = JSON.parse(read(BASELINE_DIR, "feed.json"))
  const actual = JSON.parse(read(HUGO_DIR, "feed.json"))

  expect(withoutContent(actual)).toEqual(withoutContent(expected))
})

test("feed.json items have the same content", async ({ page }) => {
  test.slow()

  const expected = JSON.parse(read(BASELINE_DIR, "feed.json"))
  const actual = JSON.parse(read(HUGO_DIR, "feed.json"))

  const outline = async (html) => {
    await page.setContent(`<main>${html}</main>`)
    return page.evaluate(extractBody, "main")
  }

  for (const item of expected.items) {
    const match = actual.items.find((x) => x.id === item.id)

    expect
      .soft(await outline(match?.content_html ?? ""), item.id)
      .toBe(await outline(item.content_html))
  }
})

test("feeds only use absolute URLs", () => {
  const relative = /(?:href|src)=\\?"(?![a-z]+:|#)[^"]*/g

  for (const file of ["atom.xml", "feed.json"]) {
    expect(read(HUGO_DIR, file).match(relative) ?? [], file).toEqual([])
  }
})
