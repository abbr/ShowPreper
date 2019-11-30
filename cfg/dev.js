var path = require('path')
var webpack = require('webpack')

// Add needed plugins here

var config = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = config
