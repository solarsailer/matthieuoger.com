import React, {Fragment} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import Button from '../components/Button'
import SocialNavigation from '../components/SocialNavigation'

import {colors} from '../styles/config'
import {siteNavigation} from '../../content/config/site-navigation'

import avatar from '../../content/images/avatar-black-white.jpg'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const HOME_BREAKPOINT = 800

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100vh;

  color: white;

  padding: 4rem 2rem;
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

  @media (max-width: ${HOME_BREAKPOINT}px) {
    margin-bottom: 4rem;
  }
`

const MainTitle = styled.h1`
  color: ${colors.brand.main};

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

const Navigation = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  margin-bottom: 3rem;

  line-height: normal;

  li {
    margin: 0 2.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: ${HOME_BREAKPOINT}px) {
    display: block;
    width: 400px;

    li {
      text-align: center;
    }
  }
`

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

    <Navigation>
      {siteNavigation.map(x => (
        <li key={x.url}>
          <Button url={x.url}>{x.name}</Button>
        </li>
      ))}
    </Navigation>

    <SocialNavigation
      handles={metadata.handles}
      iconsOnlyBreakpoint={HOME_BREAKPOINT}
    />
  </Container>
)
