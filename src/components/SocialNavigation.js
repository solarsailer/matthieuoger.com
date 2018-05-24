import React, {Fragment} from 'react'
import styled from 'styled-components'

import {getIcon} from '../components/Icon'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const OuterNavigationList = styled.ul`
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

const OuterNavigationItem = ({
  url,
  site,
  domain = 'com',
  handle = 'solarsailer',
  color = 'white'
}) => {
  return (
    <Fragment>
      <li>
        <a href={url} color={{color: color}}>
          <div className="text">
            <span>{site}</span>
            <span style={{opacity: 0.25}}>.{domain}/</span>
            <span style={{color: color}}>{handle}</span>
          </div>
          <div className="icon">{getIcon(site)}</div>
        </a>
      </li>
    </Fragment>
  )
}

export default () => {
  return (
    <OuterNavigationList>
      <OuterNavigationItem
        url="https://twitter.com/solarsailer/"
        site="twitter"
        color="#4DA4FA"
      />
      <OuterNavigationItem
        url="https://github.com/solarsailer/"
        site="github"
        color="#6CC644"
      />
      <OuterNavigationItem
        url="https://dribbble.com/solarsailer/"
        site="dribbble"
        color="#EA4C89"
      />
      <OuterNavigationItem
        url="https://unsplash.com/solarsailer/"
        site="unsplash"
        color="#B3B3B3"
      />
      <OuterNavigationItem
        url="https://instagram.com/matthieuoger/"
        site="instagram"
        handle="matthieuoger"
        color="#AB62EE"
      />
    </OuterNavigationList>
  )
}
