import React, {Fragment} from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

import Post from '../Post'

// -------------------------------------------------------------
// Default.
// -------------------------------------------------------------

export default function PostTemplate({data}) {
  const {
    markdownRemark: {
      frontmatter: {title, readableDate},
      html
    },
    site: {siteMetadata}
  } = data

  return (
    <Fragment>
      <Helmet>
        <title>
          {title} — {siteMetadata.title}
        </title>
      </Helmet>
      <Post title={title} date={readableDate} content={html} />
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
      }
    }

    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        date
        readableDate: date(formatString: "DD MMMM YYYY")
        title
      }
    }
  }
`
