import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'

import Meta from '../components/layouts/Meta'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import {Page, PageContentConstrained} from '../components/layouts/Page'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default props => {
  const metadata = props.data.site.siteMetadata

  return (
    <Page>
      <Meta site={props.data.site} />

      <Header />
      <PageContentConstrained>
        {props.children({...props, metadata})}
      </PageContentConstrained>
      <Footer handles={metadata.handles} />
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
