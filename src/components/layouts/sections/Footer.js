import React from 'react'
import styled from 'styled-components'
import {StaticQuery, graphql} from 'gatsby'

import SocialNavigation, {GRID_BREAKPOINT} from '../../CompactSocialNavigation'
import {colors} from '../../../styles/config'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const MAX_WIDTH_FOOTER = 550

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Footer = styled.footer`
  color: #aaa;
  max-width: ${MAX_WIDTH_FOOTER}px;
  margin-left: auto;
  margin-right: auto;

  margin-top: 10rem;
  padding-top: 3rem;
  padding-bottom: 3rem;

  border-top: 1px solid rgba(0, 0, 0, 0.1);

  ul {
    margin-bottom: 1rem;
  }

  > :last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${GRID_BREAKPOINT}px) {
    ul {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: ${MAX_WIDTH_FOOTER + 100}px) {
    max-width: 80%;
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

const FooterWrapper = ({handles}) => (
  <Footer className="page-footer" id="page_footer">
    <SocialNavigation handles={handles} />
    <Copyright>
      <a href="/">
        © 2019 <span>Matthieu Oger</span>
      </a>
    </Copyright>
  </Footer>
)

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default () => {
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              handles {
                twitter
                github
                dribbble
                unsplash
                instagram
                speakerDeck
                linkedIn
              }
            }
          }
        }
      `}
      render={data => (
        <FooterWrapper handles={data.site.siteMetadata.handles} />
      )}
    />
  )
}
