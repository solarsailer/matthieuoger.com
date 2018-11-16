import {css} from 'styled-components'

import {colors, light, dark} from '../config'

// -------------------------------------------------------------
// Base Global Styles.
// -------------------------------------------------------------

const lightTheme = css`
  --colors-brand-main: ${colors.brand.main};

  --colors-selection-foreground: ${light.selection.foreground};
  --colors-selection-background: ${light.selection.background};
  --colors-page-content: ${light.page.content};
  --colors-page-background: ${light.page.background};
  --colors-page-overscroll: ${light.page.background};
`

const darkTheme = css`
  --colors-brand-main: ${colors.brand.main};

  --colors-selection-foreground: ${dark.selection.foreground};
  --colors-selection-background: ${dark.selection.background};
  --colors-page-content: ${dark.page.content};
  --colors-page-background: ${dark.page.background};
  --colors-page-overscroll: ${dark.page.background};
`

export default css`
  /* 1. Light mode by default. */
  :root {
    ${lightTheme};
  }

  /* 2. Check user preference. */

  @media (prefers-color-scheme: dark) {
    :root {
      ${darkTheme};
    }
  }

  /* 3. Then, check if the user opted-in a specific theme. */

  html[data-theme='light'] {
    ${lightTheme};
  }

  html[data-theme='dark'] {
    ${darkTheme};
  }
`
