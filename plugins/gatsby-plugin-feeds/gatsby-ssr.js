const React = require('react')
const {withPrefix} = require('gatsby-link')

const {defaultOptions} = require('./internals')

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

function prefixWithSlash(val) {
  if (val.charAt(0) !== '/') {
    val = '/' + val
  }

  return val
}

// Base code from:
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-feed/src/gatsby-ssr.js

exports.onRenderBody = ({setHeadComponents}, pluginOptions) => {
  const {feeds} = {
    ...defaultOptions,
    ...pluginOptions
  }

  const links = feeds.map(({atomPath, jsonPath}, i) => {
    atomPath = prefixWithSlash(atomPath)
    jsonPath = prefixWithSlash(jsonPath)

    return (
      <React.Fragment key={`gatsby-plugin-feeds-${i}`}>
        <link
          rel="alternate"
          type="application/atom+xml"
          href={withPrefix(atomPath)}
        />
        <link
          rel="alternate"
          type="application/json"
          href={withPrefix(jsonPath)}
        />
      </React.Fragment>
    )
  })

  setHeadComponents(links)
}
