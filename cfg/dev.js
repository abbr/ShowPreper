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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: path.join(__dirname, '/../src')
      }
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
