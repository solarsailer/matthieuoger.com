import React from 'react'
import styled, {css} from 'styled-components'
import {rgba, shade} from 'polished'

import {ButtonSmall, DisabledButtonSmall} from './Button'

import {colors} from '../styles/config'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const PAGINATION_BORDER = rgba('black', 0.1)

const BUTTON_CSS_EXTENSION = css`
  display: inline-block;
  width: 150px;
  border-radius: 0;

  &:first-child {
    border-right: 2px solid ${PAGINATION_BORDER};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:last-child {
    border-left: 2px solid ${PAGINATION_BORDER};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const PaginationButtonNormal = styled(ButtonSmall)`
  ${BUTTON_CSS_EXTENSION};
`

const PaginationDisabledButton = styled(DisabledButtonSmall)`
  ${BUTTON_CSS_EXTENSION};
`

const PaginationButton = ({url, children, isTextOnly}) => {
  if (isTextOnly) {
    return <PaginationDisabledButton>{children}</PaginationDisabledButton>
  } else {
    return <PaginationButtonNormal url={url}>{children}</PaginationButtonNormal>
  }
}

// -------------------------------------------------------------
// Default.
// -------------------------------------------------------------

export default ({isFirstPage, isLastPage, previousUrl, nextUrl}) => {
  return (
    <Container>
      <PaginationButton isTextOnly={isFirstPage} url={`/blog/${previousUrl}`}>
        ← Previous
      </PaginationButton>

      <PaginationButton url="/archive/">Archive</PaginationButton>

      <PaginationButton isTextOnly={isLastPage} url={`/blog/${nextUrl}`}>
        Next →
      </PaginationButton>
    </Container>
  )
}
