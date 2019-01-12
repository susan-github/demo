require('../server.babel')

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')

// this must be equal to your Webpack configuration "context" parameter
var projectBasePath = require('path').resolve(__dirname, '..')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools-config'))
.server(projectBasePath, () => {
  require('../src/server/start')
})