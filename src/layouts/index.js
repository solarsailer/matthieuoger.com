import React from 'react'
import {Helmet} from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default ({data, children}) => {
  const {site} = data

  return (
    <div className="page" id="page">
      <Helmet>
        <title>{site.siteMetadata.title}</title>
      </Helmet>

      <Header />

      <main className="page-content" id="page_content" role="main">
        {children()}
      </main>

      <Footer />
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
      }
    }
  }
`
