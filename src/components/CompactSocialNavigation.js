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

  svg {
    display: block;
    width: 35px;
    height: 35px;
  }

  @media (max-width: 400px) {
    flex-wrap: wrap;

    svg {
      width: 30px;
      height: 30px;
    }

    li + li {
      /* We must override this selector. */
      margin-left: 0.75rem;
    }

    li {
      /* And also set the left value here for the first element. */
      margin-left: 0.75rem;
      margin-right: 0.75rem;
      margin-bottom: 1.5rem;
    }

    /* For browsers that support grid, we need to override what we have done and use a grid instead. */
    /* This way, we can present a pretty 2x3 grid. */
    @supports (display: grid) {
      display: grid;
      grid-template-columns: repeat(3, 35px);
      grid-row-gap: 1rem;
      grid-column-gap: 2rem;

      svg {
        width: 35px;
        height: 35px;
      }

      li,
      li + li {
        margin: 0;
      }
    }
  }
`

const Link = styled.a`
  color: #aaa;
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
