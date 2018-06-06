import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import {rgba, shade, tint} from 'polished'

import {getIcon} from '../Icon'

import {colors} from '../../styles/config'
import {siteNavigation} from '../../../content/config/site-navigation'

import {Button} from '../Button'

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
    display: block;

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
// Export.
// -------------------------------------------------------------

export default () => {
  const withoutAboutNavigation = siteNavigation.filter(x => x.id !== 'about')
  const aboutNavigation = siteNavigation.filter(x => x.id === 'about')

  return (
    <Header className="page-header" id="page_header">
      <GlobalMenu>
        <GlobalTitle>
          <Link to="/">{getIcon('site', {color: 'white'})}  SolarSailer</Link>
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
