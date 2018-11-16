import {css} from 'styled-components'

import {typography} from '../config'

// -------------------------------------------------------------
// Base Global Styles.
// -------------------------------------------------------------

export default css`
  /**
   * Box-model:
   * 1. Change default box-model to border-box.
   * 2. All elements will inherit from the <html> box-model.
   */

  html {
    box-sizing: border-box; /* 1 */
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit; /* 2 */
  }

  /**
   * Typography:
   * 1. Change default typography (eg. 10px, line-height, font stack).
   * 2. Then, set a flexible font-size on the body.
   */

  html {
    font: ${'62.5%/' +
      typography.document.lineHeight +
      ' ' +
      typography.document.fontStack}; /* 1 */
  }

  body {
    font-size: ${typography.document.fontSize + 'em'}; /* 2 */
  }

  pre,
  code {
    /* We don't have the control on PrismJS output,
     * so we need to force these styles with !important.
     */
    font-family: ${typography.code.fontStack} !important;
    line-height: ${typography.code.lineHeight} !important;
  }

  /**
   * Full-viewport body.
   */

  body {
    position: relative;
    min-height: 100vh;
    margin: 0;
  }

  /**
   * Colors:
   * 1. Content.
   * 2. Overscroll.
   * 3. Document background.
   * 4. Selection.
   */

  html {
    /* 1 */
    color: var(--color-page-content);

    /* 2 */
    background: var(--color-page-overscroll);
  }

  body {
    /* 3 */
    background: var(--color-page-background);
  }

  ::selection {
    /* 4 */
    color: var(--color-selection-foreground);
    background: var(--color-selection-background);
  }
`
