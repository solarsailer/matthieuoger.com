import React, {Fragment} from 'react'
import styled from 'styled-components'

import {getIcon} from '../components/Icon'
import {getSocial} from '../content/social'

// -------------------------------------------------------------
// Functions.
// -------------------------------------------------------------

function convertSocialToItem([name, handle]) {
  const info = getSocial(name)
  if (!info) return

  return (
    <SocialItem
      key={name}
      handle={handle}
      name={info.name}
      url={info.url}
      domain={info.domain}
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

  margin-bottom: 0;

  font-size: 0.7em;
  font-weight: 500;
  text-transform: uppercase;
  line-height: normal;

  li {
    text-align: center;
  }

  li + li {
    margin-left: 3rem;
  }
`

// -------------------------------------------------------------
// Item.
// -------------------------------------------------------------

const SocialItemLink = styled.a`
  color: white;

  span,
  aside {
    opacity: 0.5;
    transition: all 0.3s;
  }

  text-decoration: none;

  &:hover {
    color: white;

    span,
    aside {
      opacity: 1;
    }

    .special-opacity {
      opacity: 0.25;
    }
  }
`

const SocialItemText = styled.div`
  margin-bottom: 1.5rem;
`

const SocialItemHandle = styled.span`
  color: ${props => props.color};
`

const SocialItem = ({handle, name, url, domain, color = 'white'}) => {
  url = url.replace('@HANDLE', handle)

  return (
    <li>
      <SocialItemLink href={url}>
        <SocialItemText>
          <span>{name}</span>
          <span className="special-opacity">.{domain}/</span>
          <SocialItemHandle color={color}>{handle}</SocialItemHandle>
        </SocialItemText>
        <aside>{getIcon(name, {color})}</aside>
      </SocialItemLink>
    </li>
  )
}

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default ({handles}) => {
  return <List>{Object.entries(handles).map(convertSocialToItem)}</List>
}
