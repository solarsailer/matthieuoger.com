import React from 'react'
import {createGlobalStyle} from 'styled-components'

import normalize from './normalize'
import theme from './theme'
import base from './base'
import app from './app'

import 'prismjs/themes/prism-tomorrow.css'

// -------------------------------------------------------------
// Manifest.
// -------------------------------------------------------------

const NormalizeGlobalStyles = createGlobalStyle`${normalize}`
const ThemeGlobalStyles = createGlobalStyle`${theme}`
const BaseGlobalStyles = createGlobalStyle`${base}`
const AppGlobalStyles = createGlobalStyle`${app}`

export default () => (
  <>
    <NormalizeGlobalStyles />
    <ThemeGlobalStyles />
    <BaseGlobalStyles />
    <AppGlobalStyles />
  </>
)
