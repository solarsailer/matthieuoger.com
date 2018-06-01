import React from 'react'
import styled from 'styled-components'

import {siteNavigation} from '../../../content/config/site-navigation'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Header = styled.header`
  display: flex;
  align-items: center;

  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  padding: 4rem;

  line-height: normal;
`

const TitleBlock = styled.div`
  margin-right: 5rem;

  h1 {
    margin: 0;
    font-size: 1.8em;
    font-weight: 300;
    text-transform: uppercase;
  }

  aside {
    font-weight: bold;
    text-transform: uppercase;
  }
`

const NavBlock = styled.nav`
  flex: 1;
`

const List = styled.ul`
  display: flex;
  flex: 1;

  justify-content: space-around;
  align-items: center;

  margin: 0;
`

export default () => (
  <Header className="page-header" id="page_header">
    <TitleBlock>
      <h1>Solar Sailer</h1>
      <aside>Matthieu Oger</aside>
    </TitleBlock>
    <NavBlock>
      <List>
        {siteNavigation.map(x => (
          <li key={x.url}>
            <a href={x.url}>{x.name}</a>
          </li>
        ))}
      </List>
    </NavBlock>
  </Header>
)
