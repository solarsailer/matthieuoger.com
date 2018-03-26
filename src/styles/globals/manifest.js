import {injectGlobal} from 'styled-components'

import normalize from './normalize'
import base from './base'
import app from './app'

// See: https://github.com/styled-components/styled-components/issues/1109

// -------------------------------------------------------------
// Manifest.
// -------------------------------------------------------------

injectGlobal`${normalize}`
injectGlobal`${base}`
injectGlobal`${app}`
