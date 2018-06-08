import styled, {css} from 'styled-components'
import {rgba, tint} from 'polished'

import {colors} from '../config'
import bodyLinkStyles from './body-link'

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

  /* Images. */

  img {
    max-width: 100%;
  }

  /* Links. */

  ${bodyLinkStyles};

  /* Lists. */

  ul {
    list-style-type: disc;
    padding-left: 4rem;
  }

  ol {
    list-style-type: decimal;
    padding-left: 4rem;

    li {
      padding-left: 1rem;
    }
  }

  li {
    margin-bottom: 1rem;
  }

  /* Blockquotes. */

  blockquote {
    color: rgb(50, 50, 50);

    margin-top: 0;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-bottom: 2rem;

    padding: 2.5rem;
    padding-right: 3rem;
    padding-left: calc(3rem - 3px); /* Subtract left border. */

    background: #f1f1f1;
    border-radius: 5px;
    border-left: 3px solid rgb(220, 220, 220);

    font-size: 0.85em;
    line-height: 1.45;

    @media (max-width: 700px) {
      margin-left: -2rem;
      margin-right: -2rem;

      border-left: none;
      border-radius: 0;

      background: #eaeaea;
    }
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  /* HR. */

  hr {
    color: ${rgba(colors.brand.main, 0.2)};

    max-width: 80%;
    height: 1px;
    margin: 5rem 0 6rem;
    margin-left: auto;
    margin-right: auto;

    background: linear-gradient(
      to right,
      ${colors.page.background},
      #e0e0e0,
      ${colors.page.background}
    );

    border: none;
  }

  /* Footnotes */

  /* Note: yes, this is dirty, but we don't have any control on how footnotes are generated by Remark. */
  .footnotes {
    position: relative;

    margin-top: 10rem;
    padding: 2rem 0;

    background: #eee;
    border-radius: 5px;

    font-size: 0.85em;

    &::before {
      content: 'Footnotes';

      position: absolute;
      top: -20px;
      right: 20px;

      color: #bbb;
      font-size: 0.75em;
      text-transform: uppercase;
    }

    hr {
      display: none;
    }

    ol {
      margin-bottom: 0;
    }

    li {
      position: relative;
      margin-bottom: 2rem;
      padding: 0 2rem 0;
      border-bottom: 1px solid ${rgba('black', 0.1)};

      &:last-of-type {
        margin-bottom: -2rem;
        padding-bottom: 0;
        border: none;
      }

      blockquote {
        margin-left: 0;
        margin-right: 0;
        padding: 1.5rem;
        background: #ddd;
        border: none;
      }

      .footnote-backref {
        position: absolute;
        top: 0;
        right: -11px;

        margin-left: 2rem;
        padding: 6px 6px 3px;
        background: ${tint(0.4, colors.brand.main)};
        border-bottom: none;
        border-radius: 5px;

        font-size: 0.9em;
        line-height: normal;

        &:hover {
          color: white;
          background: ${colors.brand.main};
        }
      }
    }
  }
`
