import { readFileSync } from "node:fs"
import { join } from "node:path"

import { expect, test } from "@playwright/test"

import { extractBody } from "./extract"
import { BASELINE_DIR, HUGO_DIR, REWRITTEN_PAGES, flatten } from "./pages"

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

  const outline = async (html, id) => {
    await page.setContent(`<main>${html}</main>`)
    const result = await page.evaluate(extractBody, "main")

    const isRewritten = REWRITTEN_PAGES.some((x) => id.endsWith(x))
    return isRewritten ? flatten(result) : result
  }

  for (const item of expected.items) {
    const match = actual.items.find((x) => x.id === item.id)

    expect
      .soft(await outline(match?.content_html ?? "", item.id), item.id)
      .toBe(await outline(item.content_html, item.id))
  }
})

// -------------------------------------------------------------
// Validity, whatever production did.
// -------------------------------------------------------------

test("atom.xml is well-formed and has the required elements", async ({
  page
}) => {
  const xml = read(HUGO_DIR, "atom.xml")

  const report = await page.evaluate((xml) => {
    const document = new DOMParser().parseFromString(xml, "application/xml")
    const has = (parent, name) =>
      Boolean(parent.querySelector(`:scope > ${name}`))

    const feed = document.documentElement
    const entries = [...feed.querySelectorAll(":scope > entry")]

    return {
      error: document.querySelector("parsererror")?.textContent ?? null,
      root: feed.localName,
      namespace: feed.namespaceURI,
      // RFC 4287: a feed and its entries must have an id, a title and a date.
      feed: ["id", "title", "updated"].filter((x) => !has(feed, x)),
      entries: entries.filter(
        (entry) =>
          !["id", "title", "updated", "content"].every((x) => has(entry, x))
      ).length,
      count: entries.length
    }
  }, xml)

  expect(report).toEqual({
    error: null,
    root: "feed",
    namespace: "http://www.w3.org/2005/Atom",
    feed: [],
    entries: 0,
    count: JSON.parse(read(HUGO_DIR, "feed.json")).items.length
  })
})

test("feed.json follows JSON Feed 1.0", () => {
  const feed = JSON.parse(read(HUGO_DIR, "feed.json"))

  expect(feed.version).toBe("https://jsonfeed.org/version/1")
  expect(typeof feed.title).toBe("string")
  expect(Array.isArray(feed.items)).toBe(true)

  for (const item of feed.items) {
    // Required: an id and a content. The rest must be well-typed if present.
    expect(typeof item.id, item.id).toBe("string")
    expect(item.content_html.length, item.id).toBeGreaterThan(0)
    expect(new URL(item.url).href, item.id).toBe(item.url)
    expect(new Date(item.date_published).toISOString(), item.id).toBe(
      item.date_published
    )
  }

  const ids = feed.items.map((x) => x.id)
  expect(new Set(ids).size).toBe(ids.length)
})

test("atom.xml and feed.json have the same entries and content", async ({
  page
}) => {
  const xml = read(HUGO_DIR, "atom.xml")
  const feed = JSON.parse(read(HUGO_DIR, "feed.json"))

  const entries = await page.evaluate((xml) => {
    const document = new DOMParser().parseFromString(xml, "application/xml")
    const text = (entry, name) =>
      entry.querySelector(`:scope > ${name}`).textContent

    return [...document.querySelectorAll("entry")].map((entry) => ({
      id: text(entry, "id"),
      title: text(entry, "title"),
      date: text(entry, "updated"),
      content: text(entry, "content")
    }))
  }, xml)

  expect(entries).toEqual(
    feed.items.map((item) => ({
      id: item.id,
      title: item.title,
      date: item.date_published,
      content: item.content_html
    }))
  )
})

test("production's atom.xml had the same content as its feed.json", () => {
  // Sanity check of the reference: comparing our JSON content with
  // production's (above) then also covers Atom.
  const xml = read(BASELINE_DIR, "atom.xml")
  const feed = JSON.parse(read(BASELINE_DIR, "feed.json"))

  const contents = [...xml.matchAll(/<!\[CDATA\[([\s\S]*?)\]\]><\/content>/g)]

  expect(contents.map((x) => x[1])).toEqual(
    feed.items.map((x) => x.content_html)
  )
})
