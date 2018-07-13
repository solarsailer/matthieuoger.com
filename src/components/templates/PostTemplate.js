import React, {Fragment} from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import {URL} from 'url'

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

  const postUrl = new IsomorphicURL(path, siteMetadata.siteUrl).toString()
  const postDescription =
    getExcerpt(excerptLine, excerptQuote) || siteMetadata.description

  return (
    <Fragment>
      <Helmet>
        <title>
          {title} — {siteMetadata.author}
        </title>

        <meta name="twitter:title" content={title} />
        <meta property="og:title" content={title} />

        <meta name="twitter:url" content={postUrl} />
        <meta property="og:url" content={postUrl} />

        {postDescription && (
          <meta name="twitter:description" content={postDescription} />
        )}
        {postDescription && (
          <meta property="og:description" content={postDescription} />
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
  query PostById($id: String!) {
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
