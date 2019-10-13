import {css} from 'styled-components'

// -------------------------------------------------------------
// Body Link.
// -------------------------------------------------------------

export default css`
  a {
    color: hsl(var(--hue-accent), 70%, 10%);

    padding-top: 1px;

    border-bottom: 2px solid var(--color-accent);

    transition: all 0.175s;

    text-decoration: none;
  }

  a:visited {
    color: hsl(var(--hue-accent), 70%, 10%);
  }

  a:hover {
    color: hsl(var(--hue-accent), 78%, 53%);
    background: hsl(var(--hue-accent), 76%, 95%);
    border-color: hsl(var(--hue-accent), 77%, 72%);
  }

  a:active,
  a:focus {
    color: hsl(var(--hue-accent), 69%, 47%);
    background: hsl(var(--hue-accent), 76%, 90%);
    border-color: hsl(var(--hue-accent), 69%, 47%);
  }
`
