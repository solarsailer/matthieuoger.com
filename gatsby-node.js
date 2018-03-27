const path = require('path')
const {createFilePath} = require('gatsby-source-filesystem')

const {
  createMarkdownNode,
  createPathForMarkdownNode,
  removeDateInFilename,
  convertDateToPath
} = require('./src/node/markdown-creator')

const {assignLayout} = require('./src/node/layouts')

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
      name: 'slug',
      value: path.join('/', prefix, name)
    })

    createNodeField({
      node,
      name: 'path',
      value: createPathForMarkdownNode(node)
    })
  }
}

exports.createPages = ({boundActionCreators, graphql}) => {
  return graphql(GET_ALL_POSTS).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createMarkdownNode(node, boundActionCreators)
    })
  })
}

exports.onCreatePage = async ({page, boundActionCreators}) => {
  const {createPage} = boundActionCreators

  return new Promise((resolve, reject) => {
    const hasAssignedLayout = assignLayout(page)
    if (hasAssignedLayout) createPage(page)

    resolve()
  })
}

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
          redirectFrom
        }
        fields {
          path
          slug
        }
      }
    }
  }
}`
