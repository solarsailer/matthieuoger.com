import React from 'react'
import styled from 'styled-components'
import {graphql} from 'gatsby'

import Meta from '../components/layouts/Meta'
import {Page, PageContent} from '../components/layouts/Page'

// -------------------------------------------------------------
// Layout.
// -------------------------------------------------------------

export default props => {
  const metadata = props.data.site.siteMetadata

  return (
    <Page>
      <Meta site={props.data.site} layout="home" />

      <PageContent>{props.children({...props, metadata})}</PageContent>
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
        siteUrl
        googleFonts
        handles {
          twitter
          github
          dribbble
          unsplash
          instagram
          speakerDeck
        }
      }
    }
  }
`
