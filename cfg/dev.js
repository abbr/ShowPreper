var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('./base');

// Add needed plugins here
var BowerWebpackPlugin = require('bower-webpack-plugin');

var config = _.mergeWith({
  entry: {
    app: './src/components/run',
    presentation: './src/components/show/presentation',
    polyfill: 'babel-polyfill',
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
}, baseConfig, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: path.join(__dirname, '/../src')
});

module.exports = config;
