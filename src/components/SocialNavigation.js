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
      url={info.url}
      site={info.name}
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

  font-size: 0.85em;
  font-weight: 500;
  text-transform: uppercase;
  line-height: normal;

  li {
    text-align: center;
  }

  li + li {
    margin-left: 3rem;
  }

  a {
    color: white;

    text-decoration: none;
  }

  .text {
    margin-bottom: 1.5rem;
  }

  .icon {
  }
`

const SocialItem = ({url, site, domain, handle, color = 'white'}) => {
  return (
    <li>
      <a href={url} color={{color: color}}>
        <div className="text">
          <span>{site}</span>
          <span style={{opacity: 0.25}}>.{domain}/</span>
          <span style={{color: color}}>{handle}</span>
        </div>
        <div className="icon">{getIcon(site, {color})}</div>
      </a>
    </li>
  )
}

export default ({handles}) => {
  return <List>{Object.entries(handles).map(convertSocialToItem)}</List>
}
