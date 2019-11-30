var path = require('path')
var webpack = require('webpack')
// Add needed plugins here
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

var config = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CleanWebpackPlugin({
      root: path.join(__dirname, '..')
    })
  ]
}

module.exports = config
