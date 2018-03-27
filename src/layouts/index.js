import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

import Meta from './components/Meta'
import Header from './components/Header'
import Footer from './components/Footer'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default ({data, children}) => {
  return (
    <div className="page" id="page">
      <Header />

      <main className="page-content" id="page_content" role="main">
        {children()}
      </main>

      <Footer />

      <Meta site={data.site} />
    </div>
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
