import React from 'react'

import Meta from './sections/Meta'
import {Page, PageContent} from './sections/Page'

// -------------------------------------------------------------
// Layout.
// -------------------------------------------------------------

export default ({children}) => {
  return (
    <Page>
      <Meta layout="home" />

      <PageContent>{children}</PageContent>
    </Page>
  )
}
