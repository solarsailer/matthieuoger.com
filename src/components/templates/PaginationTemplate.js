import React, {Fragment} from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import {rgba, shade} from 'polished'

import Post from '../Post'
import MiniPostCard from '../MiniPostCard'
import PaginationController from '../PaginationController'

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

function divideContent(items, {isFirstPage, splitAt}) {
  if (isFirstPage) {
    const main = items.slice(0, splitAt)
    const rest = items.slice(splitAt)

    return (
      <Fragment>
        <Posts>
          {main.map(({node}) => (
            <li key={node.id}>
              <Post
                title={node.frontmatter.title}
                date={node.frontmatter.readableDate}
                content={node.html}
              />
            </li>
          ))}
        </Posts>
        <Grid>{createGridItems(rest)}</Grid>
      </Fragment>
    )
  }

  return <Grid>{createGridItems(items)}</Grid>
}

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Pagination = styled.div`
  padding: 5rem 0;
`

const Posts = styled.ul`
  li {
    margin-bottom: 3rem;
  }
`

const Grid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-bottom: 0;
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

  const content = divideContent(group, {isFirstPage: first, splitAt: 3})

  return (
    <div>
      <PaginationController
        previousUrl={previous}
        nextUrl={next}
        isFirstPage={first}
        isLastPage={last}
      />

      <Pagination>{content}</Pagination>

      {group.length > 3 && (
        <PaginationController
          previousUrl={previous}
          nextUrl={next}
          isFirstPage={first}
          isLastPage={last}
        />
      )}
    </div>
  )
}
