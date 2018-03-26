import React from 'react'
import {Helmet} from 'react-helmet'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default ({data, children}) => {
  const {site} = data

  return (
    <main role="main">
      <Helmet>
        <title>{site.siteMetadata.title}</title>
      </Helmet>
      <div class="page-content">{children()}</div>
    </main>
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
