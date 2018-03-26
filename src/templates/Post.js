import React from 'react'
import {Helmet} from 'react-helmet'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default function Template({data}) {
  const {markdownRemark, site} = data
  const {frontmatter, html} = markdownRemark

  return (
    <div>
      <Helmet>
        <title>
          {frontmatter.title} — {site.siteMetadata.title}
        </title>
      </Helmet>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
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
