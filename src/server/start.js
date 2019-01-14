
const ejs = require('ejs')
const path = require('path')
const config = require('./../../config')
const { ssrRender } = require('./ssrRender')

const express = require('express')
const app = express()

const router = express.Router()

router.get('/*', ssrRender)

app.use('/', router)

app.listen(config.port, (err) => {
  if (err) {
    console.error(err.stack || err);
    process.exit(0);
  }
  console.log(`server side is listening the port: ${config.port}`)
});