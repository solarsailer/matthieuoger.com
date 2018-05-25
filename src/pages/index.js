import React, {Fragment} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import {rgba, shade, tint} from 'polished'

import {Colors} from '../styles/variables'
import SocialNavigation from '../components/SocialNavigation'

import avatar from '../images/avatar-black-white.jpg'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;

  color: white;

  padding: 2rem;
`

// -------------------------------------------------------------
// Avatar.
// -------------------------------------------------------------

const Avatar = styled.div`
  margin-bottom: 10rem;
  text-align: center;

  img {
    width: 350px;
    height: 350px;
    border-radius: 100%;
    margin-bottom: 4.5rem;
  }
`

const MainTitle = styled.h1`
  color: ${Colors.Brand.Main};

  margin-bottom: 0;

  font-size: 3.35em;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 0.75;
`

const SubTitle = styled.h2`
  margin-bottom: 0;

  font-size: 2.625em;
  font-weight: bold;
  text-transform: uppercase;
  line-height: normal;
`

// -------------------------------------------------------------
// Navigation List.
// -------------------------------------------------------------

const InnerNavigationList = styled.ul`
  display: flex;

  margin-bottom: 5rem;

  line-height: normal;

  li + li {
    margin-left: 5rem;
  }
`

const InnerNavigationItem = ({url, children}) => {
  const Container = styled.li`
    text-transform: uppercase;

    a {
      display: block;
      color: white;
      padding: 1rem 2rem;
      background: ${rgba(Colors.Brand.Main, 0.2)};
      border: 2px solid transparent;
      border-radius: 5px;

      transition: all 0.2s ease-in;
      text-decoration: none;

      &:hover {
        background: ${Colors.Brand.Main};
        box-shadow: 0 2px 15px ${rgba(Colors.Brand.Main, 0.5)};
        transform: translateY(-2px);
      }

      &:focus {
        outline: none;
        border: 2px solid ${rgba(tint(0.75, Colors.Brand.Main), 0.5)};
      }

      &:active {
        outline: none;
      }
    }
  `

  return (
    <Fragment>
      <Container>
        <Link to={url}>{children}</Link>
      </Container>
    </Fragment>
  )
}

// -------------------------------------------------------------
// Page.
// -------------------------------------------------------------

export default ({metadata}) => (
  <Container>
    <Avatar>
      <img src={avatar} title="Matthieu Oger" alt="Matthieu Oger" />
      <MainTitle>{metadata.home.title}</MainTitle>
      <SubTitle>{metadata.home.subtitle}</SubTitle>
    </Avatar>

    <InnerNavigationList>
      <InnerNavigationItem url="/about/">About</InnerNavigationItem>
      <InnerNavigationItem url="/blog/">Blog</InnerNavigationItem>
      <InnerNavigationItem url="/resume/">Resume</InnerNavigationItem>
      <InnerNavigationItem url="/resume/">Photos</InnerNavigationItem>
      <InnerNavigationItem url="/rss/">RSS</InnerNavigationItem>
    </InnerNavigationList>

    <SocialNavigation handles={metadata.handles} />
  </Container>
)
