import {css} from 'styled-components'

// -------------------------------------------------------------
// Themes.
// -------------------------------------------------------------

const lightTheme = css`
  --color-selection-foreground: hsl(0, 0%, 100%);
  --color-selection-background: hsl(11, 78%, 53%);

  --color-page-content: hsl(0, 0%, 10%);
  --color-page-background: hsl(0, 0%, 98%);
  --color-page-overscroll: hsl(0, 0%, 98%);
`

const darkTheme = css`
  --color-selection-foreground: hsl(0, 0%, 100%);
  --color-selection-background: hsl(11, 78%, 53%);

  --color-page-content: hsl(0, 0%, 100%);
  --color-page-background: hsl(325, 13%, 18%);
  --color-page-overscroll: hsl(325, 13%, 18%);
`

export default css`
  /* 1. Light mode by default. */
  :root {
    --hue-accent: 11;
    --color-accent: hsl(var(--hue-accent), 78%, 53%);

    --hue-twitter: 210;
    --color-twitter: hsl(210, 95%, 64%);

    --hue-tldr: 21;
    --color-tldr: hsl(21, 81%, 61%);

    ${lightTheme};
  }

  /* 2. Check user preference. */

  @media (prefers-color-scheme: dark) {
    /* :root {
      ${darkTheme};
    } */
  }

  /* 3. Then, check if the user opted-in a specific theme. */

  html[data-theme='light'] {
    /* ${lightTheme}; */
  }

  html[data-theme='dark'] {
    /* ${darkTheme}; */
  }
`
