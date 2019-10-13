import {css} from 'styled-components'

import {breakpoints, sizes} from '../../config'

import hintStyles from './hint'

// -------------------------------------------------------------
// Blockcode.
// -------------------------------------------------------------

export default css`
  .gatsby-highlight {
    position: relative;

    @media (max-width: ${breakpoints.small}px) {
      margin-left: -2rem;
      margin-right: -2rem;
    }

    &::before {
      content: 'Code';
      ${hintStyles};
    }
  }

  .gatsby-highlight pre {
    margin: 0;
    margin-bottom: 2rem;
    padding: 1.5rem 2.5rem;
    border-radius: ${sizes.block.radius}px;

    code {
      white-space: pre-wrap;
    }

    @media (max-width: ${breakpoints.small}px) {
      border-radius: 0;
    }
  }

  code {
    font-size: 0.75em;
  }

  /* Inline code block. */

  p code,
  li code {
    color: var(--color-accent);

    margin-left: 2px;
    margin-right: 2px;

    padding-top: 4px;
    padding-bottom: 3px;
    padding-left: 6px;
    padding-right: 6px;

    background: hsla(0, 0%, 0%, 0.09);

    font-weight: bold;
  }
`
