import {css} from 'styled-components'

// -------------------------------------------------------------
// Title.
// -------------------------------------------------------------

export default css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
    line-height: normal;

    &::before {
      opacity: 0.25;
      font-size: 0.75em;
      font-weight: 300;
      font-style: normal;
    }

    .more {
      color: hsl(0, 0%, 53%);
      margin-left: 0.5rem;
      font-size: 0.7em;
      font-weight: normal;
      text-transform: none;
    }
  }

  h1 {
    margin-top: 6rem;
    margin-bottom: 4rem;

    font-size: 1.3em;
    font-weight: bold;
    text-transform: uppercase;

    &::before {
      content: '# ';
    }
  }

  h2 {
    margin-top: 5rem;
    margin-bottom: 3rem;

    padding-bottom: 0.5rem;
    border-bottom: 2px solid hsla(0, 0%, 0%, 0.1);

    font-size: 1.2em;
    font-weight: normal;
    text-transform: uppercase;

    &::before {
      content: '## ';
    }
  }

  h3 {
    display: table;

    margin-top: 4rem;
    margin-bottom: 2rem;

    padding-bottom: 0.5rem;
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.15);

    font-size: 1.2em;
    font-weight: normal;
    text-transform: none;

    &::before {
      content: '### ';
    }
  }

  h4 {
    margin-top: 4rem;
    margin-bottom: 2rem;

    color: hsl(0, 0%, 20%);

    font-size: 1.1em;
    font-weight: 500;
    text-transform: none;

    &::before {
      content: '#### ';
    }
  }

  h5 {
    margin-top: 3rem;
    margin-bottom: 2rem;

    color: hsl(0, 0%, 39%);

    font-size: 0.9em;
    font-weight: 500;
    text-transform: uppercase;

    &::before {
      content: '##### ';
    }
  }

  h6 {
    margin-top: 3rem;
    margin-bottom: 2rem;

    color: hsl(0, 0%, 59%);

    font-size: 0.8em;
    font-weight: normal;
    text-transform: uppercase;

    &::before {
      content: '###### ';
    }
  }
`
