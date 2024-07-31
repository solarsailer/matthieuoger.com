import {css} from 'styled-components'

// -------------------------------------------------------------
// Small layout (Flex And Grid) for social navigation.
// -------------------------------------------------------------

// This layout is used by this component and the compact social nav.
// They both work with flexbox, so the behavior is the same.
// TODO: these two components might get merged someday.
export default css`
  /* First, set everything with flexbox for older browsers. */
  flex-wrap: wrap;

  svg {
    width: 30px;
    height: 30px;
  }

  li + li {
    /* We must override this selector. */
    margin-left: 0.75rem;
  }

  li {
    /* And also set the left value here for the first element. */
    margin-left: 0.75rem;
    margin-right: 0.75rem;
    margin-bottom: 1.5rem;
  }

  /* For browsers that support grid, we need to override what we have done and use a grid instead. */
  /* This way, we can present a pretty 2x3 grid. */
  @supports (display: grid) {
    display: grid;

    grid-template-columns: repeat(3, 35px);
    grid-row-gap: 1rem;
    grid-column-gap: 2rem;

    svg {
      width: 35px;
      height: 35px;
    }

    li,
    li + li {
      margin: 0;
    }

    /* Hacks for a 7 elements list. */

    li:nth-child(7) {
      grid-column: 2;
    }
  }
`
