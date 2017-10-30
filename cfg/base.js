var path = require('path')
var srcPath = path.join(__dirname, '/../src')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')
var gitRevisionPlugin = new (require('git-revision-webpack-plugin'))()
var gitHash = ''
try {
  gitHash = gitRevisionPlugin.commithash()
} catch (ex) {}
let port = process.env.port || 8000

module.exports = {
  context: path.join(__dirname, '..'),
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: '[name].[hash].js'
  },
  entry: {
    app: [path.join(__dirname, '../src/components/run')],
    impress: path.join(__dirname, '../src/components/show/renderImpress'),
    bespoke: path.join(__dirname, '../src/components/show/renderBespoke'),
    handouts: path.join(__dirname, '../src/components/show/renderHandouts'),
    vendors: ['webpack-material-design-icons', 'babel-polyfill']
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions: srcPath + '/actions/',
      components: srcPath + '/components/',
      sources: srcPath + '/sources/',
      stores: srcPath + '/stores/',
      styles: srcPath + '/styles/',
      config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV
    },
    modules: [srcPath, 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test')
        ],
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /about\.js$/,
        loader: 'string-replace-loader',
        enforce: 'pre',
        query: {
          search: '$$GIT_HASH$$',
          replace: gitHash
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: new RegExp(
          'node_modules\\' + path.sep + '(?!webpack-dev-server).*'
        )
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.sass/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader?outputStyle=expanded&indentedSyntax'
        ]
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader?outputStyle=expanded'
        ]
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.styl/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },

      // Needed for the css-loenader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      { test: /\.spj$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/', 'index.html'),
      filename: 'index.html',
      chunks: ['vendors', 'app']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/', 'impress.html'),
      filename: 'impress.html',
      chunks: ['vendors', 'impress']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/', 'handouts.html'),
      filename: 'handouts.html',
      chunks: ['vendors', 'handouts']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/', 'bespoke.html'),
      filename: 'bespoke.html',
      chunks: ['vendors', 'bespoke']
    }),
    new CopyWebpackPlugin([{ from: 'src/favicon.ico' }])
  ],
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: port,
    inline: true
  }
}
