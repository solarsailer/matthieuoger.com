import React from 'react'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

export const Page = ({children}) => (
  <div className="page" id="page">
    {children}
  </div>
)

export const PageContent = ({children}) => (
  <main className="page-content" id="page_content" role="main">
    {children}
  </main>
)
