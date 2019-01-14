const fs = require('fs');
const path = require('path')
const HappyPack = require('happypack')
const LogPlugin = require('webpack-logplugin')
const config = require('../config')

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools-config'))
const host = (config.host || 'localhost');
const port = (Number(config.port) + 1) || 3001;

const babelrc = fs.readFileSync('./src/client/.babelrc')
const babelrcObj = JSON.parse(babelrc)
const babelrcObj_dev = babelrcObj.env && babelrcObj.env.localdev || {};
let combinedPlugins = babelrcObj.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObj_dev.plugins);
const babelLoaderQuery = Object.assign({}, babelrcObj_dev, babelrcObj, { plugins: combinedPlugins });
delete babelLoaderQuery.env;

const assetsPath = path.resolve(__dirname, '../static/dist')
const publicPath = 'http://' + host + ':' + port + '/dist/'

module.exports = {
  context: path.resolve(__dirname,'..'),
  devtool: 'inline-source-map',
  entry: './src/client/app.js',
  output: {
    path: assetsPath,
    filename: 'bundle.js',
    publicPath: publicPath
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'happypack/loader?id=happybabel',
        }
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.json', '.web.js', '.js', '.jsx', 'less', 'scss', 'css'],
  },
  plugins: [
    new HappyPack({
      id: 'happybabel',
      loaders: [{
        loader: 'babel-loader',
        query: Object.assign({cacheDirectory: true }, babelLoaderQuery)
      }],
      // threadPool: happyThreadPool,
      threads: 4,
      verbose: true
    }),
    new LogPlugin( () => {
      console.log('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
}