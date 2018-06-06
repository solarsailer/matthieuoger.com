import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import PostRecap from '../components/PostRecap'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

const List = styled.ul`
  margin-bottom: 0;
`

export default ({data}) => {
  const edges = data.allMarkdownRemark.edges

  return (
    <div>
      <List>
        {edges.map(({node}) => (
          <li key={node.id}>
            <PostRecap
              url={node.fields.path}
              title={node.frontmatter.title}
              date={node.frontmatter.readableDate}
            />
          </li>
        ))}
      </List>
    </div>
  )
}

// -------------------------------------------------------------
// Queries.
// -------------------------------------------------------------

export const POSTS_LIST_QUERY = graphql`
  query PostsListQuery {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            readableDate: date(formatString: "DD MMMM YYYY")
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
