var path = require('path')
var webpack = require('webpack')
var baseConfig = require('./base')

// Add needed plugins here
var BowerWebpackPlugin = require('bower-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var config = {
  output: {
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      include: path.join(__dirname, '/../src')
    }]
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([{from: 'src/favicon.ico'}]),
  ]
}

module.exports = config
