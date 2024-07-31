import {css} from 'styled-components'

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
    background-color: hsl(324, 24%, 8%);
  }

  html[data-layout='home'] body {
    background-color: hsl(324, 24%, 8%);
  }

  /**
   * Default links.
   */

  a {
    color: var(--color-accent);
  }

  a:hover {
    color: hsl(var(--hue-accent), 77%, 65%); /* Tint @ 75% */
  }

  /**
   * Highlights.
   */

  mark {
    padding: 2px 0 0;
    background-color: hsl(54 99% 55% / 0.4);

    font-weight: 500;
  }
`
