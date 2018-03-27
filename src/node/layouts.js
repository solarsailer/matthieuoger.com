// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

exports.assignLayout = page => {
  if (page.path === '/') {
    page.layout = 'home'
    return true
  }

  return false
}
