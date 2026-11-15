import { readFileSync } from "node:fs"
import { join } from "node:path"

import { expect, test } from "@playwright/test"

import { SITE_DIR } from "./pages"

// -------------------------------------------------------------
// Feeds: valid, complete, and saying the same thing.
//
// Subscribers depend on their URLs (/atom.xml, /feed.json) and on
// the ids of their entries (the URL of each post): never change them.
// -------------------------------------------------------------

function read(file) {
  return readFileSync(join(SITE_DIR, file), "utf8")
}

test("atom.xml is well-formed and has the required elements", async ({
  page
}) => {
  const xml = read("atom.xml")

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
      // An id or a date must not contain any whitespace.
      spaced: [...document.querySelectorAll("id, updated, uri, icon")].filter(
        (x) => /\s/.test(x.textContent)
      ).length,
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
    spaced: 0,
    feed: [],
    entries: 0,
    count: JSON.parse(read("feed.json")).items.length
  })
})

test("feed.json follows JSON Feed 1.0", () => {
  const feed = JSON.parse(read("feed.json"))

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
  const xml = read("atom.xml")
  const feed = JSON.parse(read("feed.json"))

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
