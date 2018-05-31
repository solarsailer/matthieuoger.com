import React, {Fragment} from 'react'
import styled from 'styled-components'

import {getIcon} from './Icon'
import {getSocial} from '../../content/config/social'

import Tooltip from './Tooltip'

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
`

const Link = styled.a`
  opacity: 0.5;
  transition: all 0.12s ease-out;

  &:hover {
    opacity: 1;
  }
`

const Item = ({handle, name, url, color = 'white'}) => {
  url = url.replace('@HANDLE', handle)

  return (
    <li>
      <Tooltip text={name} color={color}>
        <a href={url}>{getIcon(`${name}-line`, {color})}</a>
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
