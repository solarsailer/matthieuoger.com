import {css} from 'styled-components'
import {tint} from 'polished'

import {Colors} from '../variables'

// -------------------------------------------------------------
// App Global Styles.
// -------------------------------------------------------------

export default css`
  /**
   * Reset.
   */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  hr,
  ul,
  ol,
  dl {
    margin-top: initial;
    margin-bottom: 2rem;
  }

  ol,
  ul {
    list-style: none;
    padding-left: initial;
  }

  /**
   * Change backgrounds for 'home' layout.
   */

  html[data-layout='home'] {
    background-color: #1a1016;
  }

  html[data-layout='home'] body {
    background-color: #1a1016;
  }

  /**
   * Default links.
   */

  a {
    color: ${Colors.Brand.Main};
  }

  a:hover {
    color: ${tint(0.75, Colors.Brand.Main)};
  }
`
