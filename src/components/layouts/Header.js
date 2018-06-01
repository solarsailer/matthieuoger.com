import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import {getIcon} from '../Icon'

import {colors} from '../../styles/config'
import {siteNavigation} from '../../../content/config/site-navigation'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const BREAKPOINT = 700

// -------------------------------------------------------------
// Functions.
// -------------------------------------------------------------

function convertItemToMenuElement(item) {
  return (
    <li key={item.url}>
      <Link to={item.url}>• {item.name}</Link>
    </li>
  )
}

// -------------------------------------------------------------
// Global Menu.
// -------------------------------------------------------------

const GlobalMenu = styled.nav`
  display: flex;
  align-items: baseline;

  padding: 2rem 10%;

  color: white;
  background: ${colors.brand.main};

  line-height: normal;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 950px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

const GlobalTitle = styled.h1`
  margin: 0;
  margin-right: 5rem;

  font-size: 1.15em;
  font-weight: normal;
  text-transform: uppercase;

  a {
    display: block;
    transition: all 0.3s ease-out;
    transform-origin: bottom left;
  }

  a svg {
    vertical-align: -2px;
    transition: all 0.3s ease-out;
  }

  a:hover {
    transform: scale(1.05);
  }

  a:hover svg {
    opacity: 0.9;
    transform: scale(0.8) rotate(1turn);
  }
`

const GlobalList = styled.ul`
  flex: 1;

  display: flex;
  justify-content: flex-end;

  margin: 0;
  margin-left: auto;

  li + li {
    margin-left: 2rem;
  }
`

const GlobalItem = styled.li`
  font-size: 0.9em;
  text-transform: uppercase;

  &::before {
    content: '•';
    margin-right: 0.5rem;
    opacity: 0.8;
  }

  &:last-of-type::before {
    content: '|' !important;
    margin-right: 2rem;
    opacity: 0.5;
  }

  a {
    opacity: 0.8;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease-out;
  }

  a.special {
    opacity: 0.5;
  }

  a.selected {
    opacity: 1;
    border-bottom: 2px solid white;
  }
`

// -------------------------------------------------------------
// Contextual Menu.
// -------------------------------------------------------------

const ContextualMenu = styled.nav`
  background: #f7f7f7;
  padding: 1rem 10%;

  @media (max-width: 950px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

const ContextualList = styled.ul`
  display: flex;
  margin: 0;

  font-size: 0.9em;

  li + li {
    margin-left: 3rem;
  }
`

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

const Header = styled.header`
  margin-bottom: 5rem;
`

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
          <GlobalItem>
            <Link to="/blog/" activeClassName="selected">
              Blog
            </Link>
          </GlobalItem>
          <GlobalItem>
            <Link to="/resume/" activeClassName="selected">
              Resume
            </Link>
          </GlobalItem>
          <GlobalItem>
            <Link to="/photos/" activeClassName="selected">
              Photos
            </Link>
          </GlobalItem>
          <GlobalItem>
            <Link to="/rss/" activeClassName="selected">
              RSS
            </Link>
          </GlobalItem>
          <GlobalItem>
            <Link to="/about/" className="special" activeClassName="selected">
              About <strong>Matthieu Oger</strong>
            </Link>
          </GlobalItem>
        </GlobalList>
      </GlobalMenu>
      <ContextualMenu>
        <ContextualList>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ContextualList>
      </ContextualMenu>
    </Header>
  )
}
