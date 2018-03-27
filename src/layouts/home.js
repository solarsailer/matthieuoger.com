import React from 'react'
import styled from 'styled-components'

import Meta from './components/Meta'
import {Page, PageContent} from './components/Page'

// -------------------------------------------------------------
// Layout.
// -------------------------------------------------------------

export default ({data, children}) => {
  return (
    <Page>
      <PageContent>{children()}</PageContent>

      <Meta site={data.site} layout="home" />
    </Page>
  )
}

// -------------------------------------------------------------
// Queries.
// -------------------------------------------------------------

export const LAYOUT_QUERY = graphql`
  query HomeLayoutQuery {
    site {
      siteMetadata {
        title
        author
        description
        keywords
        url
        googleFonts
        handles {
          github
          twitter
          dribbble
          unsplash
          instagram
        }
      }
    }
  }
`
