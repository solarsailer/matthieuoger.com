import React from 'react'
import {Helmet} from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Card from './card.jpg'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default ({data, children}) => {
  const {site: {siteMetadata: metadata}} = data
  const {handles} = metadata

  const fullUrl = `http://${metadata.url}/`

  return (
    <div className="page" id="page">
      <Header />

      <main className="page-content" id="page_content" role="main">
        {children()}
      </main>

      <Footer />

      <Helmet>
        <title>{metadata.title}</title>

        {/*
        <link rel="shortcut icon" href={Favicon}>
        <link rel="alternate" type="application/atom+xml" title={metadata.title} href="FEED.ATOM">
        <link rel="alternate" type="application/json" title={metadata.title} href="FEED.JSON">
        */}

        <meta name="author" content={metadata.author} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />

        {/* Twitter */}
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={handles.twitter} />
        <meta name="twitter:creator" content={handles.twitter} />
        <meta name="twitter:url" content={fullUrl} />
        <meta name="twitter:image" content={Card} />
        <meta
          name="twitter:image:alt"
          content={`${metadata.title} — ${metadata.description}`}
        />

        {/* OpenGraph */}
        <meta property="og:locale" content="en" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:site_name" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={Card} />
        <meta property="og:image:height" content="1920" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:type" content="website" />
      </Helmet>
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
