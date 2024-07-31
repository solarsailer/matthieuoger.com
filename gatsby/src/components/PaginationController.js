import React from 'react'
import styled, {css} from 'styled-components'

import {ButtonSmall, DisabledButtonSmall} from './Button'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const PAGINATION_BORDER = 'hsla(0, 0%, 0%, 0.1)'

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
  align-items: center;

  @media (max-width: 400px) {
    font-size: 0.8em;

    /* Hack… I would like to know if it's possible
     * to get a styled-components class to prevent that.
     *
     * But well, increase the padding to make bigger buttons on mobiles.
     */
    a,
    span {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }
  }
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
      <PaginationButton
        isTextOnly={isFirstPage}
        url={`/articles/${previousUrl}`}
      >
        ←{'\u00A0'}Previous
      </PaginationButton>

      <PaginationButton url="/archive/">Archive</PaginationButton>

      <PaginationButton isTextOnly={isLastPage} url={`/articles/${nextUrl}`}>
        Next{'\u00A0'}→
      </PaginationButton>
    </Container>
  )
}
