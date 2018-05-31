import React from 'react'
import styled from 'styled-components'

import SocialNavigation from '../CompactSocialNavigation'

import {colors} from '../../styles/config'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Footer = styled.footer`
  color: #aaa;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  margin-top: 10rem;
  margin-bottom: 3rem;
  padding-top: 3rem;

  border-top: 1px solid rgba(0, 0, 0, 0.1);

  ul {
    margin-bottom: 1rem;
  }
`

const Copyright = styled.p`
  font-size: 0.75em;
  text-align: center;
  text-transform: uppercase;

  a {
    color: inherit;
    transition: all 0.3s ease-out;
    text-decoration: none;
  }

  a:hover {
    color: ${colors.brand.main};
  }
`

export default ({handles}) => (
  <Footer className="page-footer" id="page_footer">
    <SocialNavigation handles={handles} />
    <Copyright>
      <a href="/">
        © 2018 <span>Matthieu Oger</span>
      </a>
    </Copyright>
  </Footer>
)
