import {css} from 'styled-components'

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
    color: var(--color-accent);
  }

  a:focus,
  a:active {
    color: hsl(var(--hue-accent), 69%, 47%); /* Shade @ 90% */
  }
`
