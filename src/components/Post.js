import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {rgba} from 'polished'

import {colors} from '../styles/config'
import postStyles from '../styles/components/post'

import invisibleLinkStyles from '../styles/components/invisible-link'

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

  @media (max-width: 900px) {
    padding: 4rem;
  }

  @media (max-width: 700px) {
    padding: 4rem 2rem;

    font-size: 0.9em;
  }
`

const Header = styled.header`
  margin-bottom: 6rem;

  text-align: center;
  line-height: normal;
`

const Title = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 1.7em;
  font-weight: 500;
  text-transform: capitalize;

  ${invisibleLinkStyles};
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

const Footer = styled.footer`
  padding-top: 5rem;

  > :last-child {
    margin-bottom: 0;
  }
`

const Date = styled.p`
  color: #aaa;
  font-size: 0.75em;
  text-align: center;

  ${invisibleLinkStyles};
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
            <Title>
              <Link to={url}>{title}</Link>
            </Title>
            <Subtitle>{date}</Subtitle>
          </Header>
        )}
        <Content dangerouslySetInnerHTML={{__html: content}} />
        <Footer>
          <Date>
            <Link to={url}>{date}</Link>
          </Date>
        </Footer>
      </Article>
    </Wrapper>
  )
}
