import React from 'react'

import Link from 'gatsby-link'

import styled, {css} from 'styled-components'
import {rgba, shade, tint} from 'polished'

import {colors} from '../styles/config'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const LINK_CSS = css`
  display: block;
  color: white;
  padding: 1rem 2rem;
  background: ${rgba(colors.brand.main, 0.2)};
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
    transform: translateY(-2px);

    text-shadow: 0 2px 4px ${rgba('black', 0.25)};
  }

  &:focus {
    outline: none;
    border: 2px solid ${rgba(tint(0.75, colors.brand.main), 0.5)};
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

export default props => {
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
