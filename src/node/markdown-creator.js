const path = require('path')
const {isValidDate, makeArrayAndForEach} = require('../sol')

const template = path.resolve('./src/templates/Post.js')

// -------------------------------------------------------------
// Functions.
// -------------------------------------------------------------

// Examples:
//   '1' => '01'
//   '12' => '12'
const toTwoDigitsUTCMonth = date => ('0' + (date.getUTCMonth() + 1)).slice(-2)

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

exports.createMarkdownNode = (node, {createPage, createRedirect}) => {
  createPage({
    path: node.fields.path,
    component: template,
    context: {
      id: node.id
    }
  })

  const redirectCreator = x => {
    createRedirect({
      fromPath: x,
      toPath: node.fields.path,
      isPermanent: true,
      redirectInBrowser: true
    })
  }

  makeArrayAndForEach(redirectCreator, node.frontmatter.redirectFrom)
}

exports.createPathForMarkdownNode = node => {
  const path = node.frontmatter.path
  if (path) return path

  return node.fields.slug
}

exports.convertDateToPath = date => {
  if (typeof date === 'string') date = new Date(date)

  if (!isValidDate(date)) {
    return ''
  }

  // Get month in two-digits format:
  const month = toTwoDigitsUTCMonth(date) + ''
  const year = date.getUTCFullYear() + ''

  return path.join(year, month)
}

exports.removeDateInFilename = filename => {
  return filename.replace(/[0-9]*-[0-9]*-[0-9]*-/i, '')
}
