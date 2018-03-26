import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

const Title = styled.h1`
  color: red;
`

export default () => (
  <div>
    <Title>Solar Sailer</Title>
    <h2>Matthieu Oger</h2>
    <Link to="/archive/">Archive</Link>
  </div>
)
