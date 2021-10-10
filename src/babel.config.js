
// Used with Jest testing
// convert typescript to common js
module.exports = function (api) {
  api.cache(true)

  const presets = [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]

  return {
    presets
  }
}