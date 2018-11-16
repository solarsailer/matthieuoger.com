import {injectGlobal} from 'styled-components'

import normalize from './normalize'
import theme from './theme'
import base from './base'
import app from './app'

import 'prismjs/themes/prism-tomorrow.css'

// See: https://github.com/styled-components/styled-components/issues/1109

// -------------------------------------------------------------
// Manifest.
// -------------------------------------------------------------

injectGlobal`${normalize}`
injectGlobal`${theme}`
injectGlobal`${base}`
injectGlobal`${app}`
