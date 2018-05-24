import React from 'react'
import styled from 'styled-components'

import SocialNavigation from '../../components/CompactSocialNavigation'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Footer = styled.footer`
  color: #aaa;
  text-align: center;

  font-size: 0.75em;

  ul {
    margin-bottom: 1rem;
  }
`

export default ({handles}) => (
  <Footer className="page-footer" id="page_footer">
    <SocialNavigation handles={handles} />
    <p>© 2018 Matthieu Oger</p>
  </Footer>
)
