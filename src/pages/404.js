import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import {Button} from '../components/Button'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Title = styled.h1`
  font-size: 5em;
  font-weight: 300;
`

const List = styled.ul`
  display: flex;
  padding: 2rem;

  li + li {
    margin-left: 5rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;

    li + li {
      margin-left: 0;
      margin-top: 2rem;
    }
  }
`

// -------------------------------------------------------------
// Default.
// -------------------------------------------------------------

export default ({data}) => {
  return (
    <Container>
      <Title>404</Title>
      <p>There's nothing here, unfortunately.</p>
      <List>
        <li>
          <Button url="/">Home</Button>
        </li>
        <li>
          <Button url="/about/">About</Button>
        </li>
        <li>
          <Button url="/articles/">Articles</Button>
        </li>
      </List>
    </Container>
  )
}