import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

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

const Avatar = styled.div`
  margin-bottom: 10rem;
  text-align: center;

  img {
    width: 350px;
    height: 350px;
    border-radius: 100%;
    margin-bottom: 4rem;
  }
`

const MainTitle = styled.h1`
  margin-bottom: 0;
  font-size: 4em;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 0.75;
`

const SubTitle = styled.h2`
  font-size: 3.15em;
  font-weight: bold;
  text-transform: uppercase;
  line-height: normal;
`

const List = styled.ul`
  display: flex;
  justify-content: center;

  li + li {
    margin-left: 1rem;
  }

  a {
    color: white;
    text-decoration-color: tomato;

    &:hover {
      color: tomato;
    }
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

export default () => (
  <Container>
    <Avatar>
      <img src={avatar} title="Matthieu Oger" alt="Matthieu Oger" />
      <MainTitle>SolarSailer</MainTitle>
      <SubTitle>Matthieu Oger</SubTitle>
    </Avatar>

    <List>
      <LinkItem url="/about/">About</LinkItem>
      <LinkItem url="/blog/">Blog</LinkItem>
      <LinkItem url="/archive/">Archive</LinkItem>
      <LinkItem url="/resume/">Resume</LinkItem>
      <LinkItem url="/rss/">RSS</LinkItem>
    </List>

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
