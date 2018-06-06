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
    <Item key={node.id}>
      <StyledLink to={node.fields.slug}>
        <MiniPostCard {...node} />
      </StyledLink>
    </Item>
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
            <MainItem key={node.id}>
              <Post
                title={node.frontmatter.title}
                date={node.frontmatter.readableDate}
                content={node.html}
              />
            </MainItem>
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

const Posts = styled.ul``

const Grid = styled.ul`
  margin-bottom: 0;
`

const MainItem = styled.li`
  margin-bottom: 4rem;
`

const Item = styled.li`
  margin-bottom: 2rem;
`

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
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
