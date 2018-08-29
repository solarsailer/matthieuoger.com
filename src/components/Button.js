import React from 'react'

import {Link} from 'gatsby'

import styled, {css} from 'styled-components'
import {rgba, tint} from 'polished'

import {colors} from '../styles/config'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const LINK_CSS = css`
  display: block;

  color: white;
  padding: 1rem 2rem;

  background: ${rgba(colors.brand.main, 0.9)};

  border: 2px solid transparent;
  border-radius: 5px;

  transition: all 0.2s ease-in;

  text-align: center;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    color: white;

    background: ${colors.brand.main};
    border: 2px solid ${rgba(tint(0.8, colors.brand.main), 0.5)};

    box-shadow: 0 2px 15px ${rgba(colors.brand.main, 0.5)};
    text-shadow: 0 2px 4px ${rgba('black', 0.25)};

    transform: translateY(-2px);
  }

  &:focus {
    border: 2px solid ${rgba(tint(0.75, colors.brand.main), 0.5)};

    outline: none;
  }

  &:active {
    outline: none;
  }
`

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const StyledLink = styled(Link)`
  ${LINK_CSS};
`

const StyledExternalLink = styled.a`
  ${LINK_CSS};
`

export const DisabledButton = styled.span`
  display: block;

  padding: 1rem 2rem;

  background: #ddd;
  border: 2px solid transparent;
  border-radius: 5px;

  text-align: center;
  text-transform: uppercase;

  opacity: 0.5;
`

export const DisabledButtonSmall = DisabledButton.extend`
  padding: 4px 1rem 2px;

  font-size: 0.8em;
`

export const Button = props => {
  if (props.external) {
    if (props.newTab) {
      return (
        <StyledExternalLink href={props.url} target="_blank" {...props}>
          {props.children}
        </StyledExternalLink>
      )
    }

    return (
      <StyledExternalLink href={props.url} {...props}>
        {props.children}
      </StyledExternalLink>
    )
  }

  return (
    <StyledLink to={props.url} {...props}>
      {props.children}
    </StyledLink>
  )
}

export const ButtonSmall = styled(Button)`
  padding: 4px 1rem 2px;
  font-size: 0.8em;
`
