import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import PostRecap from '../components/PostRecap'
import HeaderRow from '../components/HeaderRow'

// -------------------------------------------------------------
// Functions.
// -------------------------------------------------------------

function convertEdgeToNode(x) {
  return x.node
}

function getYear(node) {
  return new Date(node.frontmatter.date).getUTCFullYear()
}

function createRow(node) {
  return (
    <li key={node.id}>
      <PostRecap
        url={node.fields.path}
        title={node.frontmatter.title}
        date={node.frontmatter.readableDate}
      />
    </li>
  )
}

function createHeaderRow(year) {
  return (
    <li key={`archive-header-row-${year}`}>
      <HeaderRow>{year}</HeaderRow>
    </li>
  )
}

function groupByYear(items) {
  return items.reduce((acc, x, i) => {
    const year = getYear(x)

    // If first row, just add the header directly.
    if (i === 0) {
      acc.push(createHeaderRow(year))
    }
    // Otherwise, check if the current year is different from the previous node.
    else {
      const previousItem = items[i - 1]

      // Different? We have changed the year and we should add the header.
      if (getYear(previousItem) !== year) {
        acc.push(createHeaderRow(year))
      }
    }

    acc.push(createRow(x))
    return acc
  }, [])
}

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
      <List>{groupByYear(edges.map(convertEdgeToNode))}</List>
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
