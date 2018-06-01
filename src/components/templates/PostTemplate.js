import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import {rgba} from 'polished'

import {colors} from '../../styles/config'
import postStyles from '../../styles/components/post'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Article = styled.article``

const Titles = styled.div`
  margin-bottom: 6rem;

  text-align: center;
  line-height: normal;
`

const MainTitle = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 2em;
  font-weight: normal;
`

const SubTitle = styled.h2`
  margin-bottom: 0;
  color: #aaa;
  font-size: 0.8em;
  font-weight: normal;
`

const PostContent = styled.div`
  ${postStyles};
`

export default function PostTemplate({data}) {
  const {markdownRemark, site} = data
  const {frontmatter, html} = markdownRemark

  return (
    <Article>
      <Helmet>
        <title>
          {frontmatter.title} — {site.siteMetadata.title}
        </title>
      </Helmet>
      <Titles>
        <MainTitle>{frontmatter.title}</MainTitle>
        <SubTitle>{frontmatter.date}</SubTitle>
      </Titles>
      <PostContent dangerouslySetInnerHTML={{__html: html}} />
    </Article>
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
