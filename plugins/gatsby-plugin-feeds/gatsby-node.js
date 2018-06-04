const path = require('path')
const fs = require('fs')
const {promisify} = require('util')
const writeFile = promisify(fs.writeFile)

const {getAtomFeed} = require('./atom')
const {getJSONFeed} = require('./json-feed')
const {runQuery, defaultOptions} = require('./internals')

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const PUBLIC_PATH = `./public`

// -------------------------------------------------------------
// Gatsby.
// -------------------------------------------------------------

// Base code from:
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-feed/src/gatsby-node.js

exports.onPostBuild = async ({graphql}, pluginOptions) => {
  delete pluginOptions.plugins

  const options = {
    ...defaultOptions,
    ...pluginOptions
  }

  if (`query` in options) {
    options.query = await runQuery(graphql, options.query)
  }

  const metadata = options.query.site.siteMetadata

  for (const feed of options.feeds) {
    feed.query = await runQuery(graphql, feed.query)

    const data = {
      ignoredCategories: feed.ignoredCategories,
      metadata,

      // This is too specific and should be reworked to be a real plugin.
      elements: feed.query.allMarkdownRemark.edges.map(x => x.node)
    }

    const atomData = getAtomFeed({...data, outputPath: feed.atomPath})
    const jsonData = getJSONFeed({...data, outputPath: feed.jsonPath})

    await Promise.all([
      writeFile(path.join(PUBLIC_PATH, feed.atomPath), atomData),
      writeFile(path.join(PUBLIC_PATH, feed.jsonPath), jsonData)
    ])
  }

  return Promise.resolve()
}
