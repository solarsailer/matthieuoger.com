import React from 'react'
import styled from 'styled-components'

import Meta, {createMetadataQuery} from '../components/Meta'

// -------------------------------------------------------------
// Layout.
// -------------------------------------------------------------

export default ({data, children}) => {
  return (
    <div className="page" id="page">
      <main className="page-content" id="page_content" role="main">
        {children()}
      </main>

      <Meta site={data.site} />
    </div>
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
