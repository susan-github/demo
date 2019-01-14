require('../server.babel')

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')

// this must be equal to your Webpack configuration "context" parameter
var rootDir = require('path').resolve(__dirname, '..')
global.ROOTDIR = rootDir

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools-config'))
.server(rootDir, () => {
  require('../src/server/start')
})