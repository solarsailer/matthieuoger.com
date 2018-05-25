import React, {Fragment} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {random} from 'lodash'
import {tween, easing} from 'popmotion'

import {getIcon} from '../components/Icon'
import {getSocial} from '../content/social'
import {withMountedAnimator} from './MountedAnimator'

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

// Animate the component on start with the mounted animator HOC.
const Animation = withMountedAnimator(
  posed.div({
    mounted: {
      y: 0,
      opacity: 1,
      transition: props =>
        tween({
          ...props,
          ease: props.key === 'y' ? easing.backOut : easing.linear
        })
    },
    unmounted: {
      y: 10,
      opacity: 0
    }
  })
)

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

// Full item.
const SocialItem = ({handle, name, url, domain, color = 'white'}) => {
  url = url.replace('@HANDLE', handle)

  return (
    <li>
      <Animation delay={random(0, 250)} duration={random(500, 2000)}>
        <SocialItemLink href={url}>
          <SocialItemText>
            <span>{name}</span>
            <span className="special-opacity">.{domain}/</span>
            <SocialItemHandle color={color}>{handle}</SocialItemHandle>
          </SocialItemText>
          <aside>{getIcon(name, {color})}</aside>
        </SocialItemLink>
      </Animation>
    </li>
  )
}

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default ({handles}) => {
  return <List>{Object.entries(handles).map(convertSocialToItem)}</List>
}
