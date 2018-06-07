import styled from 'styled-components'

import {colors} from '../styles/config'

// -------------------------------------------------------------
// Default
// -------------------------------------------------------------

export default styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 5rem;

  font-size: 3em;
  font-weight: 500;

  &::before,
  &::after {
    content: '';

    flex: 1;
    height: 1px;

    background: #ccc;
  }

  &::before {
    margin-right: 3rem;
    background: linear-gradient(to left, #e2e1e1, ${colors.page.background});
  }

  &::after {
    margin-left: 3rem;
    background: linear-gradient(to right, #e2e1e1, ${colors.page.background});
  }
`
