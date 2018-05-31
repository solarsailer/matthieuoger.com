import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'

import bodyLinkStyles from '../../styles/components/body-link'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Container = styled.article`
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  padding: 4rem;

  ${bodyLinkStyles};
`

export default function PostTemplate({data}) {
  const {markdownRemark, site} = data
  const {frontmatter, html} = markdownRemark

  return (
    <Container>
      <Helmet>
        <title>
          {frontmatter.title} — {site.siteMetadata.title}
        </title>
      </Helmet>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </Container>
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
