import React from 'react'

// -------------------------------------------------------------
// Module.
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

export const pageQuery = graphql`
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
