const { existsSync } = require('fs')
const { resolve } = require('path')

if (!existsSync(resolve(__dirname, 'src'))) {
  /** @type {import('./src/install')} */
  const utils = require('./lib/install')
  utils.install()
}
