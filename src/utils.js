// -------------------------------------------------------------
// Exports.
// -------------------------------------------------------------

module.exports = {isValidDate}

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

function isValidDate(date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    return false
  }

  if (Number.isNaN(date.getTime())) {
    return false
  }

  return true
}
