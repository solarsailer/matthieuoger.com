// Custom utility toolbet.

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

exports.makeArrayAndForEach = (callback, data) => {
  if (!data) return

  const list = Array.isArray(data) ? data : [data]

  list.forEach(callback)
}
