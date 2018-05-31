import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

import Meta from '../components/layouts/Meta'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import {Page, PageContent} from '../components/layouts/Page'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default props => {
  const metadata = props.data.site.siteMetadata

  return (
    <Page>
      <Header />
      <PageContent>{props.children({...props, metadata})}</PageContent>
      <Footer handles={metadata.handles} />

      <Meta site={props.data.site} />
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
        home {
          title
          subtitle
        }
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
