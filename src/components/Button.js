import React from 'react'

import {Link} from 'gatsby'

import styled, {css} from 'styled-components'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const LINK_CSS = css`
  display: block;

  color: white;
  padding: 1rem 2rem;

  background: hsla(var(--hue-accent), 78%, 53%, 0.9);

  border: 2px solid transparent;
  border-radius: 5px;

  transition: all 0.2s ease-in;

  text-align: center;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    color: white;

    background: var(--color-accent);
    border: 2px solid hsla(var(--hue-accent), 77%, 62%, 0.5);

    box-shadow: 0 2px 15px hsla(var(--hue-accent), 78%, 53%, 0.5);
    text-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.25);

    transform: translateY(-2px);
  }

  &:focus {
    border: 2px solid hsla(var(--hue-accent), 77%, 65%, 0.5);

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

export const DisabledButtonSmall = styled(DisabledButton)`
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
