import React from 'react'
import Link from 'gatsby-link'

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

function mapNode({fields, id, excerpt, frontmatter}) {
  return (
    <li key={id}>
      <h2>
        <Link to={fields.path}>{frontmatter.title}</Link>{' '}
        <span>{frontmatter.date}</span>
      </h2>
      <div>
        <p>{excerpt}</p>
      </div>
    </li>
  )
}

export default ({data}) => {
  const edges = data.allMarkdownRemark.edges

  return (
    <main role="main">
      <Link to="/">Home</Link>
      <ul>{edges.map(({node}) => mapNode(node))}</ul>
    </main>
  )
}

// -------------------------------------------------------------
// Query.
// -------------------------------------------------------------

export const POSTS_LIST_QUERY = graphql`
  query PostsListQuery {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            path
          }
          excerpt
        }
      }
    }
  }
`
