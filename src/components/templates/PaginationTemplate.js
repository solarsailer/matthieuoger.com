import React, {Fragment} from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

import Post from '../Post'
import PostRecap from '../PostRecap'

import PageTitle from '../PageTitle'
import PaginationController from '../PaginationController'

// -------------------------------------------------------------
// Functions.
// -------------------------------------------------------------

function createGridItems(items) {
  return items.map(({node}) => (
    <Item key={node.id}>
      <PostRecap
        url={node.fields.path}
        title={node.frontmatter.title}
        date={node.frontmatter.readableDate}
        excerpt={node.frontmatter.excerpt}
        excerptQuote={node.frontmatter.excerptQuote}
        showReadMoreHintInHeader
      />
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
                url={node.fields.path}
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

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default ({data, pageContext}) => {
  const {group, index, first, last, pageCount} = pageContext

  const previous = index - 1 == 1 ? '' : (index - 1).toString()
  const next = (index + 1).toString()

  const content = divideContent(group, {isFirstPage: first, splitAt: 3})

  return (
    <Fragment>
      <Helmet>
        <title>Articles — Matthieu Oger</title>
      </Helmet>

      <PageTitle url="/articles/">Articles</PageTitle>

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
    </Fragment>
  )
}
