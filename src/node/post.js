const {isValidDate} = require('../utils')

// -------------------------------------------------------------
// Exports.
// -------------------------------------------------------------

module.exports = {createPermalinkForPost}

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

function createPermalinkForPost(frontmatter) {
  const permalink = frontmatter.permalink
  if (permalink) return permalink

  const date = new Date(frontmatter.date)
  if (!isValidDate(date)) {
    throw new Error(`Date for post ${frontmatter.title} is invalid.`)
  }

  // Get month and day in two-digits format:
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
  const day = ('0' + date.getUTCDate()).slice(-2)

  const year = date.getUTCFullYear()

  return `/${year}/${month}/${day}/`
}
