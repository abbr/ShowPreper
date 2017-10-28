var path = require('path')
var webpack = require('webpack')

// Add needed plugins here

var config = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = config
