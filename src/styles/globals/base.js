import {css} from 'styled-components'

import {Typography, Colors} from '../variables'

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
      Typography.Document.LineHeight +
      ' ' +
      Typography.Document.FontStack}; /* 1 */
  }

  body {
    font-size: ${Typography.Document.FontSize + 'em'}; /* 2 */
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
    color: ${Colors.Page.Content}; /* 1 */
    background: ${Colors.Page.Overscroll}; /* 2 */
  }

  body {
    background: ${Colors.Page.Background}; /* 3 */
  }

  ::selection {
    /* 4 */
    color: ${Colors.Selection.Foreground};
    background: ${Colors.Selection.Background};
  }
`
