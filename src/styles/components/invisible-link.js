import {css} from 'styled-components'
import {shade} from 'polished'

import {colors} from '../config'

// -------------------------------------------------------------
// Invisible Link.
//
// For links that are non-important (e.g., an anchor).
// -------------------------------------------------------------

export default css`
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease-in;
  }

  a:hover {
    color: ${colors.brand.main};
  }

  a:focus,
  a:active {
    color: ${shade(0.9, colors.brand.main)};
  }
`
