import React, {Fragment} from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import Post from '../Post'
import MiniPostCard from '../MiniPostCard'

// -------------------------------------------------------------
// Functions.
// -------------------------------------------------------------

function createGridItems(items) {
  return items.map(({node}) => (
    <GridItem key={node.id}>
      <Link to={node.fields.slug}>
        <MiniPostCard {...node} />
      </Link>
    </GridItem>
  ))
}

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

const Posts = styled.ul`
  li {
    margin-bottom: 3rem;
  }
`

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

  let content
  if (first) {
    const big = group.slice(0, 3)
    const small = group.slice(3)

    content = (
      <Fragment>
        <Posts>
          {big.map(({node}) => (
            <li key={node.id}>
              <Post
                title={node.frontmatter.title}
                date={node.frontmatter.readableDate}
                content={node.html}
              />
            </li>
          ))}
        </Posts>
        <Grid>{createGridItems(small)}</Grid>
      </Fragment>
    )
  } else {
    content = <Grid>{createGridItems(group)}</Grid>
  }

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

      {content}
    </div>
  )
}
