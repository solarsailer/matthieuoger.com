import React from 'react'
import styled from 'styled-components'

import SocialNavigation from '../../components/CompactSocialNavigation'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

export default ({handles}) => (
  <footer className="page-footer" id="page_footer">
    <SocialNavigation handles={handles} />
    <p>© 2018 Matthieu Oger</p>
  </footer>
)
