var path = require('path')
var webpack = require('webpack')
var baseConfig = require('./base')

// Add needed plugins here
var BowerWebpackPlugin = require('bower-webpack-plugin')

var config = {
  entry: {
    app: ['webpack-dev-server/client?http://localhost:' + baseConfig.port + '/'
      , 'webpack/hot/dev-server']
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'react-hot!babel-loader',
      include: path.join(__dirname, '/../src')
    }]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: baseConfig.port,
    inline: true,
    info: true,
  },
  cache: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ]
}

module.exports = config
