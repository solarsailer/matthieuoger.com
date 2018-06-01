import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import {siteNavigation} from '../../../content/config/site-navigation'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const BREAKPOINT = 700

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Header = styled.header`
  display: flex;
  align-items: center;

  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6rem;
  padding: 4rem;

  line-height: normal;

  @media (max-width: ${BREAKPOINT}px) {
    flex-direction: column;
    margin-bottom: 4rem;
  }
`

const TitleBlock = styled.div`
  margin-right: auto;

  h1 {
    margin: 0;
    font-size: 1.8em;
    font-weight: 300;
    text-transform: uppercase;

    a {
      text-decoration: none;
    }
  }

  aside {
    font-weight: bold;
    text-transform: uppercase;
  }

  @media (max-width: ${BREAKPOINT}px) {
    margin-right: 0;
    margin-bottom: 4rem;

    text-align: center;
  }
`

const NavBlock = styled.nav`
  flex: 1;
`

const List = styled.ul`
  display: flex;
  flex: 1;

  justify-content: flex-end;
  align-items: center;

  margin: 0;

  li + li {
    margin-left: 2rem;
  }

  @media (max-width: ${BREAKPOINT}px) {
    justify-content: center;
  }
`

export default () => (
  <Header className="page-header" id="page_header">
    <TitleBlock>
      <h1>
        <Link to="/">Solar Sailer</Link>
      </h1>
      <aside>Matthieu Oger</aside>
    </TitleBlock>
    <NavBlock>
      <List>
        {siteNavigation.map(x => (
          <li key={x.url}>
            <Link to={x.url}>{x.name}</Link>
          </li>
        ))}
      </List>
    </NavBlock>
  </Header>
)
