const express = require('express')
const webpack = require('webpack')

const config = require('./../../config')
const webpackConfig = require('./../../webpack/dev.config')

const compiler = webpack(webpackConfig)

const host = config.host || 'localhost'
const port = (Number(config.port) + 1) || 8081

const app = new express()

const options = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  poll: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true, chunks: false },
}

app.use(require('webpack-dev-middleware')(compiler, options))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(port, (err) => {
  console.log(`client side is listening the port: ${port}`)
  if (err) {
    console.error(err)
  }
});