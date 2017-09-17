/*eslint no-console:0 */
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var open = require('open')
let devServerConfig = config.devServer
new WebpackDevServer(
  webpack(config),
  devServerConfig
).listen(devServerConfig.port, 'localhost', function(err) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at localhost:' + devServerConfig.port)
  console.log('Opening your system browser...')
  open('http://localhost:' + devServerConfig.port + '/')
})
