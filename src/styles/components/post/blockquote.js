import {css} from 'styled-components'

import {breakpoints, sizes} from '../../config'

import hintStyles from './hint'

// -------------------------------------------------------------
// Blockquote.
// -------------------------------------------------------------

export default css`
  blockquote {
    position: relative;

    color: hsl(0, 0%, 20%);

    margin: 0;
    margin-bottom: 2rem;

    padding: 2rem calc(2.5rem - 1px);

    background: hsl(0, 0%, 95%);
    border-radius: ${sizes.block.radius}px;
    border: 1px solid hsl(0, 0%, 88%);

    font-size: 0.85em;
    line-height: 1.45;

    @media (max-width: ${breakpoints.small}px) {
      margin-left: -2rem;
      margin-right: -2rem;

      border: none;
      border-radius: 0;

      background: hsl(0, 0%, 92%);
    }

    &::before {
      content: 'Quote';
      ${hintStyles};
    }
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  /* TLDR. */

  .tldr {
    background: hsl(var(--hue-tldr), 80%, 94%);
    border: 1px solid hsl(var(--hue-tldr), 80%, 90%);

    &::before {
      content: 'tl;dr';
      color: var(--color-tldr);
      opacity: 0.9;
    }
  }

  /* Transcript. */

  .transcript {
    &::before {
      content: 'Transcript';
    }
  }

  /* Twitter. */

  .twitter-tweet {
    background: hsl(var(--hue-twitter), 93%, 95%);
    border: 1px solid hsl(var(--hue-twitter), 91%, 91%);

    &::before {
      content: 'Tweet';
      color: var(--color-twitter);
      opacity: 0.55;
    }
  }
`
