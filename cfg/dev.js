var path = require('path')
var webpack = require('webpack')
var port = process.env.port || 8000

// Add needed plugins here

var config = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:' + port + '/',
      'webpack/hot/dev-server'
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: port,
    inline: true
  },
  cache: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = config
