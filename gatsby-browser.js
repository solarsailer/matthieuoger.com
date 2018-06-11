import 'babel-polyfill'

exports.onClientEntry = () => {
  // We need to export something, otherwise the config is ignored.
  // Just import the polyfill.
}
