import React, {Fragment} from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import {rgba, shade} from 'polished'

import Post from '../Post'
import MiniPostCard from '../MiniPostCard'
import {ButtonSmall, DisabledButtonSmall} from '../Button'

import {colors} from '../../styles/config'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

// const PAGINATION_BORDER = rgba(shade(0.9, colors.brand.main), 0.5)
const PAGINATION_BORDER = rgba('black', 0.1)

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

const PaginationLink = ({url, children, isTextOnly}) => {
  if (isTextOnly) {
    return <DisabledButtonSmall>{children}</DisabledButtonSmall>
  } else {
    return <ButtonSmall url={url}>{children}</ButtonSmall>
  }
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;

  :first-child {
    margin-bottom: 5rem;
  }

  :last-child {
    margin-top: 5rem;
  }

  span {
    width: 150px;
  }

  a {
    display: inline-block;
    width: 150px;
    border-radius: 0;
  }

  span:first-child,
  a:first-child {
    border-right: 2px solid ${PAGINATION_BORDER};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  span:last-child,
  a:last-child {
    border-left: 2px solid ${PAGINATION_BORDER};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

const Pagination = ({isFirstPage, isLastPage, previousUrl, nextUrl}) => {
  return (
    <PaginationContainer>
      <PaginationLink isTextOnly={isFirstPage} url={`/blog/${previousUrl}`}>
        ← Previous
      </PaginationLink>
      <ButtonSmall url="/archive/">Archive</ButtonSmall>
      <PaginationLink isTextOnly={isLastPage} url={`/blog/${nextUrl}`}>
        Next →
      </PaginationLink>
    </PaginationContainer>
  )
}

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
      <Pagination
        previousUrl={previous}
        nextUrl={next}
        isFirstPage={first}
        isLastPage={last}
      />

      {content}

      <Pagination
        previousUrl={previous}
        nextUrl={next}
        isFirstPage={first}
        isLastPage={last}
      />
    </div>
  )
}
