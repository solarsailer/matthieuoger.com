// -------------------------------------------------------------
// Utility toolbet.
// -------------------------------------------------------------

exports.makeArrayAndForEach = (callback, data) => {
  if (!data) return

  const list = Array.isArray(data) ? data : [data]

  list.forEach(callback)
}

exports.isValidDate = date => {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    return false
  }

  if (Number.isNaN(date.getTime())) {
    return false
  }

  return true
}
