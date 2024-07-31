import {css} from 'styled-components'

import titleStyles from './post/title'
import listStyles from './post/list'
import bodyLinkStyles from './post/body-link'
import specialLinkStyles from './post/special-link'
import blockquoteStyles from './post/blockquote'
import codeStyles from './post/code'
import figureStyles from './post/figure'
import footnotesStyles from './post/footnotes'

// -------------------------------------------------------------
// Post Styles.
// -------------------------------------------------------------

export default css`
  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }

  /* Titles. */

  ${titleStyles}

  /* Images & videos. */

  img,
  video {
    display: block;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid hsla(0, 0%, 0%, 0.1);
  }

  /* Links. */
  ${bodyLinkStyles}
  ${specialLinkStyles}

  /* Lists. */
  ${listStyles}

  /* Figure and figcaption. */

  ${figureStyles}

  /* Code. */

  ${codeStyles}

  /* Blockquotes. */

  ${blockquoteStyles}

  /* HR. */

  hr {
    color: hsla(var(--hue-accent), 78%, 53%, 0.2);

    max-width: 80%;
    height: 1px;
    margin: 5rem 0 6rem;
    margin-left: auto;
    margin-right: auto;

    background: linear-gradient(
      to right,
      var(--color-page-background),
      hsl(0, 0%, 88%),
      var(--color-page-background)
    );

    border: none;
  }

  /* Embeds. */

  iframe {
    display: block;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
  }

  /* Footnotes */

  ${footnotesStyles}
`
