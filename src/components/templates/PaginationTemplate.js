import React, {Component} from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import MiniPostCard from '../MiniPostCard'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const PaginationLink = ({isTextOnly, url, children}) => {
  if (isTextOnly) {
    return children
  } else {
    return <Link to={url}>{children}</Link>
  }
}

const Grid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const GridItem = styled.li`
  width: 250px;
  margin-bottom: 3rem;

  a {
    display: block;
    color: inherit;
    text-decoration: none;
  }
`

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default ({data, pathContext}) => {
  const {group, index, first, last, pageCount} = pathContext

  const previous = index - 1 == 1 ? '' : (index - 1).toString()
  const next = (index + 1).toString()

  return (
    <div>
      <p>
        <PaginationLink isTextOnly={first} url={`/blog/${previous}`}>
          ← Previous
        </PaginationLink>{' '}
        —{' '}
        <PaginationLink isTextOnly={last} url={`/blog/${next}`}>
          Next →
        </PaginationLink>
      </p>

      <Grid>
        {group.map(({node}) => (
          <GridItem key={node.id}>
            <Link to={node.fields.slug}>
              <MiniPostCard {...node} />
            </Link>
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}
