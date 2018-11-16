// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const MAIN_BRAND_COLOR = '#E44D2A'

const LIGHT_BACKGROUND_COLOR = '#f9f9f9'
const DARK_BACKGROUND_COLOR = '#352930'

// -------------------------------------------------------------
// Colors.
// -------------------------------------------------------------

export const colors = {
  brand: {
    main: MAIN_BRAND_COLOR
  }
}

export const light = {
  selection: {
    foreground: 'white',
    background: MAIN_BRAND_COLOR
  },
  page: {
    content: 'rgb(25, 25, 25)',
    background: LIGHT_BACKGROUND_COLOR,
    overscroll: LIGHT_BACKGROUND_COLOR
  }
}

export const dark = {
  selection: {
    foreground: 'white',
    background: MAIN_BRAND_COLOR
  },
  page: {
    content: 'white',
    background: DARK_BACKGROUND_COLOR,
    overscroll: DARK_BACKGROUND_COLOR
  }
}

// -------------------------------------------------------------
// Typography.
// -------------------------------------------------------------

export const typography = {
  document: {
    fontStack: 'Rubik, Verdana, sans-serif',
    fontSize: '1.8', // em
    lineHeight: '1.5'
  },
  code: {
    fontStack: '"Fira Mono", monospace',
    lineHeight: '1.25'
  }
}

// -------------------------------------------------------------
// Breakpoints.
// -------------------------------------------------------------

export const breakpoints = {
  xsmall: 550,
  small: 700
}
