import React from 'react'
import {Helmet} from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default ({data, children}) => {
  const {site: {siteMetadata}} = data

  return (
    <div className="page" id="page">
      <Helmet>
        <title>{siteMetadata.title}</title>
        <meta name="author" content={siteMetadata.author} />
        <meta name="description" content={siteMetadata.description} />
        <meta name="keywords" content={siteMetadata.keywords.join(', ')} />
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
        author
        description
        keywords
      }
    }
  }
`
