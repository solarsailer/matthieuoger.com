import styled, {css} from 'styled-components'

import bodyLinkStyles from './body-link'

// -------------------------------------------------------------
// Post Styles.
// -------------------------------------------------------------

export default css`
  & :first-child {
    margin-top: 0;
  }

  & :last-child {
    margin-bottom: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;

    &::before {
      opacity: 0.25;
      font-size: 0.75em;
      font-weight: 300;
      font-style: normal;
    }
  }

  h1 {
    margin-top: 6rem;
    margin-bottom: 4rem;

    font-size: 2em;
    font-weight: 300;
    font-variant: small-caps;

    &::before {
      content: '# ';
    }
  }

  h2 {
    margin-top: 5rem;
    margin-bottom: 3rem;

    padding-bottom: 0.5rem;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);

    font-size: 1.6em;
    font-variant: small-caps;

    &::before {
      content: '## ';
    }
  }

  h3 {
    display: table;

    margin-top: 4rem;
    margin-bottom: 2rem;

    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);

    font-size: 1.3em;

    &::before {
      content: '### ';
    }
  }

  h4 {
    margin-top: 4rem;

    color: rgb(50, 50, 50);

    font-size: 1.2em;
    font-weight: 500;

    &::before {
      content: '#### ';
    }
  }

  h5 {
    margin-top: 3rem;

    color: rgb(100, 100, 100);

    font-size: 0.9em;
    font-weight: 500;
    text-transform: uppercase;

    &::before {
      content: '##### ';
    }
  }

  h6 {
    margin-top: 3rem;

    color: rgb(150, 150, 150);

    font-size: 0.8em;
    text-transform: uppercase;

    &::before {
      content: '###### ';
    }
  }

  ${bodyLinkStyles};

  ul {
    list-style-type: disc;
    padding-left: 4rem;
  }

  li {
    margin-bottom: 1rem;
  }
`
