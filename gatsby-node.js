const path = require('path')
const {createFilePath} = require(`gatsby-source-filesystem`)

const {
  createPathForMarkdownNode,
  removeDateInFilename,
  convertDateToPath
} = require('./src/node/post')

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
          path
          title
          date
        }
        fields {
          path
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
    const prefix = convertDateToPath(node.frontmatter.date)
    const name = removeDateInFilename(createFilePath({node, getNode}))

    createNodeField({
      node,
      name: `slug`,
      value: path.join('/', prefix, name)
    })

    createNodeField({
      node,
      name: `path`,
      value: createPathForMarkdownNode(node)
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
        path: node.fields.path,
        component: template,
        context: {
          id: node.id
        }
      })
    })
  })
}
