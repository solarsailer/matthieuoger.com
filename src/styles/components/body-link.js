import {css} from 'styled-components'
import {tint, shade} from 'polished'

import {Colors} from '../variables'

// -------------------------------------------------------------
// Body Link.
// -------------------------------------------------------------

export default css`
  a {
    color: ${shade(0.2, Colors.Brand.Main)};
    padding-top: 1px;
    padding-bottom: 1px;
    border-bottom: 2px solid ${Colors.Brand.Main};

    transition: all 0.175s;

    text-decoration: none;
  }

  a:visited {
    color: ${shade(0.2, Colors.Brand.Main)};
  }

  a:hover {
    color: ${Colors.Brand.Main};
    background: ${tint(0.1, Colors.Brand.Main)};
    border-color: ${tint(0.6, Colors.Brand.Main)};
  }

  a:active,
  a:focus {
    color: ${shade(0.9, Colors.Brand.Main)};
    background: ${tint(0.2, Colors.Brand.Main)};
    border-color: ${shade(0.9, Colors.Brand.Main)};
  }
`
