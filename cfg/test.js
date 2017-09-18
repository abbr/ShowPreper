var path = require('path')
var srcPath = path.join(__dirname, '/../src/')

// Add needed plugins here

module.exports = {
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'isparta-instrumenter-loader',
        enforce: 'pre',
        include: [path.join(__dirname, '/../src')]
      },
      // {
      //   test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
      //   loader: 'null-loader'
      // },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test')
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions: srcPath + 'actions/',
      helpers: path.join(__dirname, '/../test/helpers'),
      components: srcPath + 'components/',
      sources: srcPath + 'sources/',
      stores: srcPath + 'stores/',
      styles: srcPath + 'styles/',
      config: srcPath + 'config/' + process.env.REACT_WEBPACK_ENV
    }
  }
}
