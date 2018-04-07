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
// Lists.
// -------------------------------------------------------------

const List = styled.ul`
  display: flex;
  justify-content: center;

  li + li {
    margin-left: 1rem;
  }

  a {
    color: white;
  }
`

const LinkItem = ({url, children}) => (
  <li>
    {url.includes('http') ? (
      <a href={url}>{children}</a>
    ) : (
      <Link to={url}>{children}</Link>
    )}
  </li>
)

const NavigationList = styled.ul`
  display: flex;

  li + li {
    margin-left: 5rem;
  }
`

const NavigationItem = ({url, children}) => {
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
// Page.
// -------------------------------------------------------------

export default () => (
  <Container>
    <Avatar>
      <img src={avatar} title="Matthieu Oger" alt="Matthieu Oger" />
      <MainTitle>SolarSailer</MainTitle>
      <SubTitle>Matthieu Oger</SubTitle>
    </Avatar>

    <NavigationList>
      <NavigationItem url="/about/">About</NavigationItem>
      <NavigationItem url="/blog/">Blog</NavigationItem>
      <NavigationItem url="/resume/">Resume</NavigationItem>
      <NavigationItem url="/resume/">Photos</NavigationItem>
      <NavigationItem url="/rss/">RSS</NavigationItem>
    </NavigationList>

    <List>
      <LinkItem url="https://twitter.com/solarsailer/">
        twitter.com/solarsailer
      </LinkItem>
      <LinkItem url="https://github.com/solarsailer/">
        github.com/solarsailer
      </LinkItem>
      <LinkItem url="https://dribbble.com/solarsailer/">
        dribbble.com/solarsailer
      </LinkItem>
      <LinkItem url="https://unsplash.com/solarsailer/">
        unsplash.com/solarsailer
      </LinkItem>
      <LinkItem url="https://instagram.com/matthieuoger/">
        instagram.com/matthieuoger
      </LinkItem>
    </List>
  </Container>
)
