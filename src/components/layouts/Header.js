import React from 'react'
import styled, {keyframes} from 'styled-components'
import Link from 'gatsby-link'
import {rgba, shade, tint} from 'polished'
import posed from 'react-pose'
import {random} from 'lodash'

import {getIcon} from '../Icon'

import {colors} from '../../styles/config'
import {siteNavigation} from '../../../content/config/site-navigation'

import {Button} from '../Button'

import {withMountedAnimator} from '../MountedAnimator'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const BACKGROUND_COLOR = colors.page.background
const BREAKPOINT = 650

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Header = styled.header`
  margin-bottom: 5rem;
`

const Separator = styled.hr`
  height: 1px;
  margin-left: 50%;

  background: linear-gradient(to right, ${BACKGROUND_COLOR}, #e0e0e0);
  border-top: none;
  border-bottom: none;
`

// Button extension.
const MenuButton = styled(Button)`
  color: #888;
  padding: 3px 1rem 1px;

  background: ${rgba('white', 0.5)};
  border: 2px solid ${rgba('#888', 0.25)};
  border-radius: 3px;

  font-size: 0.85em;

  &.selected:not(:hover) {
    color: white;
    background: ${tint(0.75, colors.brand.main)};
    border: 2px solid ${tint(0.75, colors.brand.main)};
  }
`

// -------------------------------------------------------------
// Global Menu.
// -------------------------------------------------------------

const GlobalMenu = styled.nav`
  display: flex;
  align-items: flex-start;

  padding: 2rem;

  background: linear-gradient(to bottom, #e2e1e1, ${BACKGROUND_COLOR});

  @media (max-width: ${BREAKPOINT}px) {
    flex-direction: column;
  }
`

const GlobalTitle = styled.h1`
  margin-bottom: 0;

  font-size: 1.4em;
  font-weight: 500;
  text-transform: uppercase;
  line-height: normal;

  a {
    display: inline-block;

    color: #888;
    text-decoration: none;

    transition: all 0.3s ease-out;
  }

  svg {
    width: 20px;
    height: 20px;

    transition: all 0.3s ease-out;
  }

  path {
    fill: #888;

    transition: all 0.3s ease-out;
  }

  a:hover {
    color: ${colors.brand.main};
    transform: translateX(5px);
    text-shadow: 0 2px 10px ${rgba(colors.brand.main, 0.25)};

    svg {
      transform: translateX(-5px) rotate(1turn);
      transform-origin: center;
    }

    path {
      fill: ${colors.brand.main};
    }
  }

  @media (max-width: ${BREAKPOINT}px) {
    margin-bottom: 1rem;
  }
`

const GlobalList = styled.ul`
  flex: 1;
  display: flex;

  margin-bottom: 0;

  justify-content: flex-end;

  li + li {
    margin-left: 1rem;
  }
`

// -------------------------------------------------------------
// Hello.
// -------------------------------------------------------------

const Hello = styled.aside`
  position: absolute;
  left: 52px;

  color: ${rgba(colors.page.content, 0.5)};

  font-size: 0.62em;
  font-weight: normal;
  text-transform: none;

  @media (max-width: ${BREAKPOINT}px) {
    display: inline-block;
    position: relative;
    left: 0;
    margin-left: 1rem;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

const HelloElement = styled.span`
  opacity: 0;
`

const HelloPrefix = HelloElement.extend`
  animation: ${fadeOut} linear 150s;
`

const HelloName = HelloElement.extend`
  color: ${colors.page.content};
  animation: ${fadeOut} linear 180s;
`

const AnimatedHello = withMountedAnimator(
  posed(Hello)({
    unmounted: {
      x: -100,
      opacity: 0
    },
    mounted: {
      x: 0,
      opacity: 1
    }
  })
)

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default () => {
  return (
    <Header className="page-header" id="page_header">
      <GlobalMenu>
        <GlobalTitle>
          <Link to="/">{getIcon('site', {color: 'white'})}  SolarSailer</Link>
          <AnimatedHello duration={random(500, 1000)}>
            <HelloPrefix>Hello, I'm</HelloPrefix>{' '}
            <HelloName>Matthieu Oger</HelloName>
          </AnimatedHello>
        </GlobalTitle>

        <GlobalList>
          <li>
            <MenuButton url="/about/" activeClassName="selected">
              About
            </MenuButton>
          </li>
          <li>
            <MenuButton url="/blog/" activeClassName="selected">
              Articles
            </MenuButton>
          </li>
          <li>
            <MenuButton url="/rss/" external newTab>
              RSS
            </MenuButton>
          </li>
        </GlobalList>
      </GlobalMenu>

      <Separator />
    </Header>
  )
}
