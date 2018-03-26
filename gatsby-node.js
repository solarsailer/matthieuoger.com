const path = require('path')
const {createFilePath} = require(`gatsby-source-filesystem`)

const {createPermalinkForPost, removeDateInSlug} = require('./src/node/post')
const template = path.resolve(`./src/templates/Post.js`)

// -------------------------------------------------------------
// Queries.
// -------------------------------------------------------------

const GET_ALL_POSTS = `{
  allMarkdownRemark(
    sort: {order: DESC, fields: [frontmatter___date]}
    limit: 1000
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          permalink
          date
        }
        fields {
          slug
        }
      }
    }
  }
}`

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

exports.onCreateNode = ({boundActionCreators, node, getNode}) => {
  const {createNodeField} = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const slug = removeDateInSlug(createFilePath({node, getNode}))

    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators

  return graphql(GET_ALL_POSTS).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: createPermalinkForPost(node.frontmatter),
        component: template,
        context: {
          id: node.id
        }
      })
    })
  })
}
