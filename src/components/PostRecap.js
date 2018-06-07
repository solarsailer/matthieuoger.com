import React from 'react'
import styled from 'styled-components'

import Link from 'gatsby-link'

import {colors} from '../styles/config'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const TRANSITION = 'all 0.2s ease-out'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const BlockLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`

// We use a wrapper to create a shadow with a ::before pseudo-element.
// This allows us to create a shadow smaller than the box of the actual element.
// The shadow is more distant and subtle.

const Wrapper = styled.div`
  position: relative;
  z-index: 1;

  will-change: transform;
  transition: ${TRANSITION};
  transition-property: transform;

  &:hover {
    transform: translateY(-5px);
  }
`

const Article = styled.article`
  padding: 2rem;

  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 3px;

  transition: ${TRANSITION};
  transition-property: color, background-color;

  &::before,
  &::after {
    content: '';

    display: block;

    position: absolute;
    z-index: -1;

    top: 2rem;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;

    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);

    transition: ${TRANSITION};
    transition-property: opacity;
  }

  &::after {
    left: 0;
    right: 0;

    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

    opacity: 0;
  }

  &:hover {
    color: white;
    background: ${colors.brand.main};

    /* Swap between ::before and ::after pseudo.
     * Its gives more fps than transitioning the shadow/left/right directly.
     */
    &::before {
      opacity: 0;
    }

    &::after {
      opacity: 1;
    }
  }
`

const Header = styled.header`
  line-height: normal;
`

const Content = styled.div`
  margin-top: 2rem;

  > :last-child {
    margin-bottom: 0;
  }
`

const Title = styled.h2`
  margin-bottom: 0.5rem;

  font-size: 0.9em;
  font-weight: 500;
`

const Date = styled.p`
  color: rgba(0, 0, 0, 0.5);

  margin-bottom: 0;

  font-size: 0.7em;
  font-weight: 500;
`

const Excerpt = styled.p`
  font-size: 0.8em;
`

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default ({url, title, date, excerpt}) => {
  return (
    <BlockLink to={url}>
      <Wrapper>
        <Article>
          <Header>
            <Title>{title}</Title>
            <Date>{date}</Date>
          </Header>
          {excerpt && (
            <Content>
              <Excerpt
                dangerouslySetInnerHTML={{
                  __html: excerpt
                }}
              />
            </Content>
          )}
        </Article>
      </Wrapper>
    </BlockLink>
  )
}
