import React, {Fragment} from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import {URL} from 'url'
import {graphql} from 'gatsby'

import PageTitle from '../PageTitle'
import Post from '../Post'

// -------------------------------------------------------------
// Functions.
// -------------------------------------------------------------

function getExcerpt(excerptLine, excerptQuote) {
  if (excerptLine) return excerptLine

  if (excerptQuote) {
    return `${excerptQuote.name}: “${excerptQuote.quote}”`
  }

  return null
}

// -------------------------------------------------------------
// Default.
// -------------------------------------------------------------

export default function PostTemplate({data}) {
  const {
    markdownRemark: {
      frontmatter: {
        title,
        readableDate,
        showPageTitle,
        excerptLine,
        excerptQuote
      },
      fields: {path},
      html
    },
    site: {siteMetadata}
  } = data

  const IsomorphicURL = URL ? URL : window.URL

  // Update for meta tags.
  const metaTitle = `${title} — ${siteMetadata.author}`
  const metaUrl = new IsomorphicURL(path, siteMetadata.siteUrl).toString()
  const metaDescription =
    getExcerpt(excerptLine, excerptQuote) || siteMetadata.description

  return (
    <Fragment>
      <Helmet>
        <title>{metaTitle}</title>

        <meta name="twitter:title" content={metaTitle} />
        <meta property="og:title" content={metaTitle} />

        <meta name="twitter:url" content={metaUrl} />
        <meta property="og:url" content={metaUrl} />

        {metaDescription && (
          <meta name="twitter:description" content={metaDescription} />
        )}
        {metaDescription && (
          <meta property="og:description" content={metaDescription} />
        )}
      </Helmet>

      {showPageTitle ? (
        <Fragment>
          <PageTitle>{title}</PageTitle>
          <Post url={path} date={readableDate} content={html} />
        </Fragment>
      ) : (
        <Post url={path} title={title} date={readableDate} content={html} />
      )}
    </Fragment>
  )
}

// -------------------------------------------------------------
// Queries.
// -------------------------------------------------------------

export const POST_QUERY = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }

    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        date
        readableDate: date(formatString: "DD MMMM YYYY")
        title
        showPageTitle
        excerptLine: excerpt
        excerptQuote {
          name
          quote
        }
      }
      fields {
        path
      }
    }
  }
`
