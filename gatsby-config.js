// -------------------------------------------------------------
// Metadata.
// -------------------------------------------------------------

exports.siteMetadata = {
  title: `Solar Sailer`
}

// -------------------------------------------------------------
// Plugins.
// -------------------------------------------------------------

exports.plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/posts`,
      name: 'posts'
    }
  },
  `gatsby-transformer-remark`,
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-react-helmet`
]
