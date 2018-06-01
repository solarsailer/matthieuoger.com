import React, {Component} from 'react'
import Link from 'gatsby-link'

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const PaginationLink = ({isTextOnly, url, children}) => {
  if (isTextOnly) {
    return children
  } else {
    return <Link to={url}>{children}</Link>
  }
}

export default ({data, pathContext}) => {
  const {group, index, first, last, pageCount} = pathContext

  const previous = index - 1 == 1 ? '' : (index - 1).toString()
  const next = (index + 1).toString()

  return (
    <div>
      <p>
        <PaginationLink isTextOnly={first} url={`/blog/${previous}`}>
          ← Previous
        </PaginationLink>{' '}
        —{' '}
        <PaginationLink isTextOnly={last} url={`/blog/${next}`}>
          Next →
        </PaginationLink>
      </p>

      {group.map(({node}) => (
        <article key={node.id}>
          <div>
            <span>{node.frontmatter.date} </span>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </div>
          <div>{node.excerpt}</div>
        </article>
      ))}
    </div>
  )
}
