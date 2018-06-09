const {URL} = require('url')

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const VERSION = 'https://jsonfeed.org/version/1'

// -------------------------------------------------------------
// JSON Feed.
// -------------------------------------------------------------

// This code is too similar to the same on in the `atom.js` file.
// TODO: refactor into one function with a map argument in `internals.js`.
function getItems(data) {
  const {
    ignoredCategories,
    metadata: {siteUrl: url, author},
    elements
  } = data

  return elements.reduce((items, x) => {
    const postUrl = new URL(x.fields.path, url).toString()
    const postDate = new Date(x.frontmatter.date).toISOString()

    if (ignoredCategories.includes(x.frontmatter.category)) {
      return items
    }

    items.push({
      id: postUrl,
      url: postUrl,
      title: x.frontmatter.title,
      content_html: x.html,
      author: {
        name: author,
        url: url
      },
      date_published: postDate
    })

    return items
  }, [])
}

exports.getJSONFeed = data => {
  const {metadata, outputPath} = data

  const feedUrl = new URL(outputPath, metadata.siteUrl).toString()

  const faviconUrl = new URL('/favicon.ico', metadata.siteUrl).toString()
  const imageUrl = new URL('/feed.png', metadata.siteUrl).toString()

  const items = getItems(data)

  const feed = {
    version: VERSION,
    title: metadata.title,
    description: metadata.description,
    icon: imageUrl,
    favicon: faviconUrl,
    home_page_url: metadata.siteUrl,
    feed_url: feedUrl,
    items
  }

  return JSON.stringify(feed, null, 2)
}
