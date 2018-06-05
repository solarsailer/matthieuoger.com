import React from 'react'
import styled from 'styled-components'

import Meta from '../components/layouts/Meta'
import {Page, PageContent} from '../components/layouts/Page'

// -------------------------------------------------------------
// Layout.
// -------------------------------------------------------------

export default props => {
  const metadata = props.data.site.siteMetadata

  return (
    <Page>
      <PageContent>{props.children({...props, metadata})}</PageContent>

      <Meta site={props.data.site} layout="home" />
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
          twitter
          github
          dribbble
          unsplash
          instagram
        }
      }
    }
  }
`
