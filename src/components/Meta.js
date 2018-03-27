import React, {Fragment} from 'react'
import {Helmet} from 'react-helmet'

import Card from '../images/card.jpg'

import '../styles/globals/manifest'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default ({site, layout}) => {
  const {siteMetadata: metadata} = site
  const {handles} = metadata

  const googleFonts = metadata.googleFonts.map(x => (
    <link
      key={x}
      rel="stylesheet"
      href={'https://fonts.googleapis.com/css?family=' + x}
    />
  ))

  const fullUrl = `http://${metadata.url}/`

  return (
    <Fragment>
      <Helmet>
        {googleFonts}

        {layout && <html data-layout={layout} />}

        <title>{metadata.title}</title>

        {/*
        <link rel="shortcut icon" href={Favicon}>
        <link rel="alternate" type="application/atom+xml" title={metadata.title} href="feed.xml">
        <link rel="alternate" type="application/json" title={metadata.title} href="feed.json">
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
    </Fragment>
  )
}
