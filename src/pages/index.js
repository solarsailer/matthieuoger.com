import React, {Fragment} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import {rgba, shade, tint} from 'polished'

import {colors} from '../styles/config'
import SocialNavigation from '../components/SocialNavigation'

import navigation, {siteNavigation} from '../../content/config/site-navigation'
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

const InnerNavigationList = styled.ul`
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

const InnerNavigationItem = ({url, children}) => {
  const Container = styled.li`
    a {
      display: block;
      color: white;
      padding: 1rem 2rem;
      background: ${rgba(colors.brand.main, 0.2)};
      border: 2px solid transparent;
      border-radius: 5px;

      transition: all 0.2s ease-in;
      text-transform: uppercase;
      text-decoration: none;

      &:hover {
        background: ${colors.brand.main};
        border: 2px solid ${rgba(tint(0.8, colors.brand.main), 0.5)};

        box-shadow: 0 2px 15px ${rgba(colors.brand.main, 0.5)};
        transform: translateY(-2px);

        text-shadow: 0 2px 4px ${rgba('black', 0.25)};
      }

      &:focus {
        outline: none;
        border: 2px solid ${rgba(tint(0.75, colors.brand.main), 0.5)};
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
      {siteNavigation.map(x => (
        <InnerNavigationItem key={x.url} url={x.url}>
          {x.name}
        </InnerNavigationItem>
      ))}
    </InnerNavigationList>

    <SocialNavigation
      handles={metadata.handles}
      iconsOnlyBreakpoint={HOME_BREAKPOINT}
    />
  </Container>
)
