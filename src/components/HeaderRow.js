import React from 'react'
import styled from 'styled-components'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`

const Header = styled.header`
  padding: 1rem 2rem;

  background: #f1f1f1;
  border: 1px solid hsla(0, 0%, 0%, 0.05);
  border-radius: 3px;

  &::before {
    content: '';

    display: block;

    position: absolute;
    z-index: -1;

    top: 2rem;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;

    box-shadow: 0 20px 30px hsla(0, 0%, 0%, 0.1);
  }
`

const Text = styled.p`
  color: #888;

  margin-bottom: 0;

  font-size: 0.9em;
  font-weight: 500;
  text-transform: uppercase;

  line-height: normal;
`

// -------------------------------------------------------------
// Default.
// -------------------------------------------------------------

export default ({children}) => {
  return (
    <Wrapper>
      <Header>
        <Text>{children}</Text>
      </Header>
    </Wrapper>
  )
}
