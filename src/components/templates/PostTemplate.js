import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

import postStyles from '../../styles/components/post'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const PostContent = styled.div`
  ${postStyles};
`

export default function PostTemplate({data}) {
  const {markdownRemark, site} = data
  const {frontmatter, html} = markdownRemark

  return (
    <article>
      <Helmet>
        <title>
          {frontmatter.title} — {site.siteMetadata.title}
        </title>
      </Helmet>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <PostContent dangerouslySetInnerHTML={{__html: html}} />
    </article>
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
        date(formatString: "DD MMMM YYYY")
        title
      }
    }
  }
`
