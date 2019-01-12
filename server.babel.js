//  enable runtime transpilation to use ES6/7 in node

const fs = require('fs')

const babelrc = fs.readFileSync('./.babelrc')
let config = null

config = JSON.parse(babelrc)

/* use bluebird as default promise */
require('core-js');
require('core-js/es6/promise').default = require('bluebird')
require('babel-register')(config);
