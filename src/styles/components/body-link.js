import {css} from 'styled-components'
import {tint, shade} from 'polished'

import {colors} from '../config'

// -------------------------------------------------------------
// Body Link.
// -------------------------------------------------------------

export default css`
  a {
    color: ${shade(0.2, colors.brand.main)};

    padding-top: 1px;

    border-bottom: 2px solid ${colors.brand.main};

    transition: all 0.175s;

    text-decoration: none;
  }

  a:visited {
    color: ${shade(0.2, colors.brand.main)};
  }

  a:hover {
    color: ${colors.brand.main};
    background: ${tint(0.1, colors.brand.main)};
    border-color: ${tint(0.6, colors.brand.main)};
  }

  a:active,
  a:focus {
    color: ${shade(0.9, colors.brand.main)};
    background: ${tint(0.2, colors.brand.main)};
    border-color: ${shade(0.9, colors.brand.main)};
  }
`
