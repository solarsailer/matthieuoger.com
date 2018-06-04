const xml = require('xml')
const {URL} = require('url')

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const XMLNS = 'http://www.w3.org/2005/Atom'

// -------------------------------------------------------------
// Atom Feed.
// -------------------------------------------------------------

// Spec: https://validator.w3.org/feed/docs/atom.html

function getMetadata(data) {
  const {
    metadata: {siteUrl: url, title, author},
    outputPath
  } = data

  const fullUrl = new URL(outputPath, url).toString()

  return [
    {id: url},
    {updated: new Date().toISOString()},
    {title: title},
    {
      link: {_attr: {href: fullUrl, rel: 'self'}}
    },
    {link: {_attr: {href: url}}},
    {author: [{name: author}, {uri: url}]}
  ]
}

// This is too specific and should be reworked to be a real plugin.
function getEntries(data) {
  const {
    ignoredCategories,
    metadata: {siteUrl: url, author},
    elements
  } = data

  return elements.reduce((entries, x) => {
    const postUrl = new URL(x.fields.path, url).toString()
    const postDate = new Date(x.frontmatter.date).toISOString()

    // Ignore an element if its category is ignored.
    if (ignoredCategories.includes(x.frontmatter.category)) {
      return entries
    }

    entries.push({
      entry: [
        {id: postUrl},
        {updated: postDate},
        {title: x.frontmatter.title},
        {link: {_attr: {href: postUrl}}},
        {content: {_attr: {type: 'html'}, _cdata: x.html}},
        {author: [{name: author}, {uri: url}]}
      ]
    })

    return entries
  }, [])
}

exports.getAtomFeed = data => {
  const metadata = getMetadata(data)
  const entries = getEntries(data)

  const feed = xml(
    {
      feed: [{_attr: {xmlns: XMLNS}}, ...metadata, ...entries]
    },
    {indent: '  '}
  )

  return feed
}

// -------------------------------------------------------------
// Example.
// -------------------------------------------------------------

// <feed xmlns="http://www.w3.org/2005/Atom">
//
//   <id>Site URI (http://example.com/)</id> (REQUIRED)
//
//   <updated>ISO 8601 (like "2016-04-01T10:23:07+00:00")</updated> (REQUIRED)
//
//   <title>TITLE</title> (REQUIRED)
//
//   <link href="http://URL/TO/atom.xml" rel="self" />
//   <link href="http://URL/"/>
//
//   <author>
//     <name>AUTHOR NAME</name>
//     <uri>AUTHOR LINK</uri>
//   </author>
//
//   <entry>
//     <id>PERMALINK</id>
//     <updated>ISO 8601</updated>
//     <title>Example title</title>
//     <link href="http://perma/link/" />
//     <content type="html">HTML</content>
//     <author>
//       <name>AUTHOR</name>
//       <uri>AUTHOR LINK</uri>
//     </author>
//   </entry>
//
//   <entry></entry>
//   <entry></entry>
//
// </feed>
