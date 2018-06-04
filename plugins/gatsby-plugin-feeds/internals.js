// Base code:
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-feed/src/internals.js

exports.runQuery = (handler, query) =>
  handler(query).then(r => {
    if (r.errors) {
      throw new Error(r.errors.join(`, `))
    }

    return r.data
  })

exports.defaultOptions = {
  query: `
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `,
  feeds: [
    {
      query: `
        {
          allMarkdownRemark(
            sort: {
              order: DESC,
              fields: [frontmatter___date]
            }
          ) {
            edges {
              node {
                frontmatter {
                  title
                  date
                  category
                }
                fields {
                  path
                }
                html
              }
            }
          }
        }
      `,
      ignoredCategories: ['meta'],
      atomPath: `atom.xml`,
      jsonPath: `feed.json`
    }
  ]
}
