import React from 'react'
import {Helmet} from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'

import GlobalStyles from '../../../styles/globals/manifest'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

const MetaWrapper = ({metadata, layout}) => {
  const {handles} = metadata

  const googleFonts = metadata.googleFonts.map(x => (
    <link
      key={x}
      rel="stylesheet"
      href={'https://fonts.googleapis.com/css?family=' + x}
    />
  ))

  const authorAndDescription = `${metadata.author} — ${metadata.description}`

  return (
    <>
      <GlobalStyles />
      <Helmet>
        {googleFonts}

        {layout && <html data-layout={layout} />}

        <title>{metadata.author}</title>

        <link rel="shortcut icon" href="/favicon.ico?v=0010" />
        <link rel="mask-icon" href="/favicon.svg?v=0011" color="#E44D2A" />

        <meta name="author" content={metadata.author} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />

        {/* Twitter */}
        <meta name="twitter:title" content={metadata.author} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={handles.twitter} />
        <meta name="twitter:creator" content={handles.twitter} />
        <meta name="twitter:url" content={metadata.siteUrl} />
        <meta name="twitter:image" content={metadata.siteUrl + '/feed.png'} />
        <meta name="twitter:image:alt" content={authorAndDescription} />

        {/* OpenGraph */}
        <meta property="og:locale" content="en" />
        <meta property="og:title" content={metadata.author} />
        <meta property="og:site_name" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.siteUrl} />
        <meta property="og:image" content={metadata.siteUrl + '/feed.png'} />
        <meta property="og:image:height" content="1920" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:alt" content={authorAndDescription} />
        <meta property="og:type" content="website" />
      </Helmet>
    </>
  )
}

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default props => {
  return (
    <StaticQuery
      query={graphql`
        {
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
                linkedIn
              }
            }
          }
        }
      `}
      render={data => (
        <MetaWrapper {...props} metadata={data.site.siteMetadata} />
      )}
    />
  )
}
