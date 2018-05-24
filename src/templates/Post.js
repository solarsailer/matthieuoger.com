import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Post = styled.article`
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  padding: 4rem;
`

export default function Template({data}) {
  const {markdownRemark, site} = data
  const {frontmatter, html} = markdownRemark

  return (
    <Post>
      <Helmet>
        <title>
          {frontmatter.title} — {site.siteMetadata.title}
        </title>
      </Helmet>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </Post>
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
