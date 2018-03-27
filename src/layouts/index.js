import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

import Meta from './components/Meta'
import Header from './components/Header'
import Footer from './components/Footer'
import {Page, PageContent} from './components/Page'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default ({data, children}) => {
  return (
    <Page>
      <Header />
      <PageContent>{children()}</PageContent>
      <Footer />

      <Meta site={data.site} />
    </Page>
  )
}

// -------------------------------------------------------------
// Queries.
// -------------------------------------------------------------

export const LAYOUT_QUERY = graphql`
  query LayoutQuery {
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
