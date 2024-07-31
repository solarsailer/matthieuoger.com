import {css} from 'styled-components'

import {typography, breakpoints, sizes} from '../../config'

// -------------------------------------------------------------
// Figure and figcaption.
// -------------------------------------------------------------

export default css`
  figure {
    margin-top: 0;
    margin-left: -1rem;
    margin-right: -1rem;
    margin-bottom: 2rem;

    padding-top: 0;
    padding-bottom: 1rem;

    background: hsl(0, 0%, 96%);
    border-radius: ${sizes.block.radius}px;

    img,
    video {
      margin-bottom: 1rem;
      border: none;
    }

    @media (max-width: ${breakpoints.small}px) {
      margin-left: -2rem;
      margin-right: -2rem;

      background: hsl(0, 0%, 95%);
    }
  }

  figcaption {
    color: hsl(0, 0%, 40%);
    padding: 0 2rem;
    font-family: ${typography.code.fontStack};
    font-size: 0.8em;
    text-align: center;
  }
`
