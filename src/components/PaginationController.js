import React from 'react'
import styled from 'styled-components'
import {rgba, shade} from 'polished'

import {ButtonSmall, DisabledButtonSmall} from './Button'

import {colors} from '../styles/config'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const PAGINATION_BORDER = rgba('black', 0.1)

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Container = styled.div`
  display: flex;
  justify-content: center;

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

const Element = ({url, children, isTextOnly}) => {
  if (isTextOnly) {
    return <DisabledButtonSmall>{children}</DisabledButtonSmall>
  } else {
    return <ButtonSmall url={url}>{children}</ButtonSmall>
  }
}

// -------------------------------------------------------------
// Default.
// -------------------------------------------------------------

export default ({isFirstPage, isLastPage, previousUrl, nextUrl}) => {
  return (
    <Container>
      <Element isTextOnly={isFirstPage} url={`/blog/${previousUrl}`}>
        ← Previous
      </Element>

      <ButtonSmall url="/archive/">Archive</ButtonSmall>

      <Element isTextOnly={isLastPage} url={`/blog/${nextUrl}`}>
        Next →
      </Element>
    </Container>
  )
}
