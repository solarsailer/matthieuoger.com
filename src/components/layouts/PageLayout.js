import React from 'react'

import Meta from './sections/Meta'
import Header from './sections/Header'
import Footer from './sections/Footer'
import {Page, PageContentConstrained} from './sections/Page'

// -------------------------------------------------------------
// Component.
// -------------------------------------------------------------

export default ({children}) => {
  return (
    <Page>
      <Meta />

      <Header />
      <PageContentConstrained>{children}</PageContentConstrained>
      <Footer />
    </Page>
  )
}
