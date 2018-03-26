import React from 'react'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default function Template({data}) {
  const {markdownRemark} = data
  const {frontmatter, html} = markdownRemark

  return (
    <div>
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
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        date(formatString: "DD MMMM YYYY")
        title
      }
    }
  }
`
