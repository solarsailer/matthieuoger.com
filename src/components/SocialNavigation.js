import React, {Fragment} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {random} from 'lodash'
import {tween, easing} from 'popmotion'

import Tooltip from './Tooltip'
import {getIcon} from './Icon'
import {getSocial} from '../../content/config/social'
import {withMountedAnimator} from './MountedAnimator'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const SOCIAL_BREAKPOINT = 1200

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
  flex-wrap: wrap;

  margin-bottom: 0;

  font-size: 0.7em;
  font-weight: 500;
  text-transform: uppercase;
  line-height: normal;

  li {
    margin-bottom: 1rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    text-align: center;
  }

  li + li {
  }

  @media (max-width: ${SOCIAL_BREAKPOINT}px) {
    li {
      margin-left: 2rem;
      margin-right: 2rem;
    }
  }

  @media (min-width: ${props => props.iconsOnlyBreakpoint}px) {
    /* Hide tooltip on big screens. */
    .tooltip {
      display: none;
    }
  }

  @media (max-width: ${props => props.iconsOnlyBreakpoint}px) {
    li {
      margin-left: 1.25rem;
      margin-right: 1.25rem;
    }

    .must-hide-if-icons-only {
      display: none;
    }

    svg {
      width: 35px;
      height: 35px;
    }
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

  @media (max-width: ${SOCIAL_BREAKPOINT}px) {
    display: flex;
    align-items: center;

    div {
      margin-bottom: 0;
      margin-left: 1rem;
    }

    aside {
      order: -1;
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
      <Tooltip text={name} color={color}>
        <Animation delay={random(0, 250)} duration={random(500, 2000)}>
          <SocialItemLink href={url}>
            <SocialItemText className="must-hide-if-icons-only">
              <span>{name.replace(' ', '')}</span>
              <span className="special-opacity">{domain && `.${domain}`}/</span>
              <SocialItemHandle color={color}>{handle}</SocialItemHandle>
            </SocialItemText>
            <aside>{getIcon(name, {color})}</aside>
          </SocialItemLink>
        </Animation>
      </Tooltip>
    </li>
  )
}

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default ({handles, iconsOnlyBreakpoint}) => {
  return (
    <List iconsOnlyBreakpoint={iconsOnlyBreakpoint}>
      {Object.entries(handles).map(convertSocialToItem)}
    </List>
  )
}
