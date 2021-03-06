import React from 'react'
import styled from 'styled-components'

import {getIcon} from './Icon'
import {getSocial} from '../../content/config/social'

import Tooltip from './Tooltip'

import gridStyles from '../styles/components/grid-social-nav'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

export const GRID_BREAKPOINT = 500

// -------------------------------------------------------------
// Functions.
// -------------------------------------------------------------

function convertSocialToItem([name, handle]) {
  const info = getSocial(name)
  if (!info) return

  return (
    <Item
      key={name}
      handle={handle}
      name={info.name}
      url={info.url}
      color={info.color}
    />
  )
}

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

  svg {
    display: block;
    width: 35px;
    height: 35px;
  }

  @media (max-width: ${GRID_BREAKPOINT}px) {
    ${gridStyles};
  }
`

const Link = styled.a`
  color: hsl(0, 0%, 67%);
  transition: all 0.12s ease-out;

  circle {
    stroke: currentColor;
    opacity: 0.25;
    transition: all 0.5s ease-out;
  }

  path {
    opacity: 0.9;
    transition: all 0.5s ease-out;
  }

  &:hover {
    color: ${props => props.color};

    circle,
    path {
      opacity: 1;
    }
  }
`

const Item = ({handle, name, url, color = 'white'}) => {
  url = url.replace('@HANDLE', handle)

  return (
    <li>
      <Tooltip text={name} color={color}>
        <Link href={url} color={color}>
          {getIcon(`${name}-line`, {color})}
        </Link>
      </Tooltip>
    </li>
  )
}

export default ({handles}) => {
  return (
    <nav>
      <List>{Object.entries(handles).map(convertSocialToItem)}</List>
    </nav>
  )
}
