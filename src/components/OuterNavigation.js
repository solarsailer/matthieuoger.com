import React, {Fragment} from 'react'
import styled from 'styled-components'

import {getIcon} from './Icon'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  li + li {
    margin-left: 2rem;
  }
`

const Link = styled.a`
  opacity: 0.5;
  transition: all 0.12s ease-out;

  &:hover {
    opacity: 1;
  }
`

export default () => {
  return (
    <nav>
      <List>
        <li>
          <Link href="">{getIcon('twitter-line')}</Link>
        </li>
        <li>
          <Link href="">{getIcon('github-line')}</Link>
        </li>
        <li>
          <Link href="">{getIcon('dribbble-line')}</Link>
        </li>
        <li>
          <Link href="">{getIcon('unsplash-line')}</Link>
        </li>
        <li>
          <Link href="">{getIcon('instagram-line')}</Link>
        </li>
      </List>
    </nav>
  )
}
