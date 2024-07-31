import {css} from 'styled-components'

// -------------------------------------------------------------
// List.
// -------------------------------------------------------------

export default css`
  ul {
    li {
      position: relative;

      &::before {
        content: '';

        position: absolute;
        top: 0.525em;
        left: -1.05em;

        width: 5px;
        height: 5px;

        background: var(--color-accent);
        border-radius: 50%;
      }
    }
  }

  ol {
    list-style-type: decimal;

    li {
      padding-left: 1rem;
    }
  }

  ul,
  ol {
    padding-left: 4rem;
    font-size: 0.9em;

    @media (max-width: 600px) {
      padding-left: 3rem;
    }
  }

  li {
    margin-bottom: 1rem;
  }
`
