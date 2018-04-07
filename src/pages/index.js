import React, {Fragment} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import {Colors} from '../styles/variables'

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

  font-size: 4em;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 0.75;
`

const SubTitle = styled.h2`
  margin-bottom: 0;

  font-size: 3.15em;
  font-weight: bold;
  text-transform: uppercase;
  line-height: normal;
`

// -------------------------------------------------------------
// Navigation List.
// -------------------------------------------------------------

const InnerNavigationList = styled.ul`
  display: flex;

  margin-bottom: 4rem;

  line-height: normal;

  li + li {
    margin-left: 5rem;
  }
`

const InnerNavigationItem = ({url, children}) => {
  const Container = styled.li`
    text-transform: uppercase;
    font-size: 1.25em;

    a {
      color: white;
      padding-bottom: 0.25rem;
      border-bottom: 3px solid ${Colors.Brand.Main};
      text-decoration: none;

      transition: all 0.1s ease-in;

      &:hover {
        color: ${Colors.Brand.Main};
        padding-bottom: 0.5rem;
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
// Outer Navigation.
// -------------------------------------------------------------

const OuterNavigationList = styled.ul`
  display: flex;
  justify-content: center;

  font-size: 0.8em;
  font-weight: 500;
  text-transform: uppercase;
  line-height: normal;

  li + li {
    margin-left: 3rem;
  }

  a {
    color: white;
    text-decoration: none;
  }
`

const OuterNavigationItem = ({
  url,
  site,
  domain = 'com',
  handle = 'solarsailer',
  color = 'white'
}) => {
  return (
    <Fragment>
      <li>
        <a href={url} color={{color: color}}>
          <span>{site}</span>
          <span style={{opacity: 0.25}}>.{domain}/</span>
          <span style={{color: color}}>{handle}</span>
        </a>
      </li>
    </Fragment>
  )
}

// -------------------------------------------------------------
// Page.
// -------------------------------------------------------------

export default () => (
  <Container>
    <Avatar>
      <img src={avatar} title="Matthieu Oger" alt="Matthieu Oger" />
      <MainTitle>SolarSailer</MainTitle>
      <SubTitle>Matthieu Oger</SubTitle>
    </Avatar>

    <InnerNavigationList>
      <InnerNavigationItem url="/about/">About</InnerNavigationItem>
      <InnerNavigationItem url="/blog/">Blog</InnerNavigationItem>
      <InnerNavigationItem url="/resume/">Resume</InnerNavigationItem>
      <InnerNavigationItem url="/resume/">Photos</InnerNavigationItem>
      <InnerNavigationItem url="/rss/">RSS</InnerNavigationItem>
    </InnerNavigationList>

    <OuterNavigationList>
      <OuterNavigationItem
        url="https://twitter.com/solarsailer/"
        site="twitter"
        color="#4DA4FA"
      />
      <OuterNavigationItem
        url="https://github.com/solarsailer/"
        site="github"
        color="#6CC644"
      />
      <OuterNavigationItem
        url="https://dribbble.com/solarsailer/"
        site="dribbble"
        color="#EA4C89"
      />
      <OuterNavigationItem
        url="https://unsplash.com/solarsailer/"
        site="unsplash"
        color="#B3B3B3"
      />
      <OuterNavigationItem
        url="https://instagram.com/matthieuoger/"
        site="instagram"
        handle="matthieuoger"
        color="#AB62EE"
      />
    </OuterNavigationList>
  </Container>
)
