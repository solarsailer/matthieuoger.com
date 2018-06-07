import React from 'react'
import styled from 'styled-components'
import {rgba} from 'polished'

import {colors} from '../styles/config'
import postStyles from '../styles/components/post'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`

const Article = styled.article`
  padding: 5rem;

  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 3px;

  &::before {
    content: '';

    display: block;

    position: absolute;
    z-index: -1;

    top: 2rem;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;

    box-shadow: 0 20px 30px ${rgba('black', 0.1)};
  }
`

const Header = styled.header`
  margin-bottom: 6rem;

  text-align: center;
  line-height: normal;
`

const Title = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 1.6em;
  font-weight: normal;
`

const Subtitle = styled.h2`
  margin-bottom: 0;
  color: #aaa;
  font-size: 0.8em;
  font-weight: normal;
`

const Content = styled.div`
  ${postStyles};
`

// -------------------------------------------------------------
// Default.
// -------------------------------------------------------------

export default ({url, title, date, content}) => {
  return (
    <Wrapper>
      <Article>
        {title && (
          <Header>
            <Title>{title}</Title>
            <Subtitle>{date}</Subtitle>
          </Header>
        )}
        <Content dangerouslySetInnerHTML={{__html: content}} />
      </Article>
    </Wrapper>
  )
}
