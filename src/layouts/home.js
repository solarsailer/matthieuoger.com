import React from 'react'
import styled from 'styled-components'

import Meta from './components/Meta'
import {Page, PageContent} from './components/Page'

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
        home {
          title
          subtitle
        }
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
