import React, {Fragment} from 'react'
import styled from 'styled-components'

import {getIcon, BrandColors} from './Icon'
import Tooltip from './Tooltip'

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
          <Tooltip data="Twitter" color={BrandColors.Twitter}>
            <Link href="">{getIcon('twitter-line')}</Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip data="GitHub" color={BrandColors.GitHub}>
            <Link href="">{getIcon('github-line')}</Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip data="Dribbble" color={BrandColors.Dribbble}>
            <Link href="">{getIcon('dribbble-line')}</Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip data="Unsplash" color={BrandColors.Unsplash}>
            <Link href="">{getIcon('unsplash-line')}</Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip data="Instagram" color={BrandColors.Instagram}>
            <Link href="">{getIcon('instagram-line')}</Link>
          </Tooltip>
        </li>
      </List>
    </nav>
  )
}
