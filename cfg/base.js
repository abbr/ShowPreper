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
const args = require('minimist')(process.argv.slice(2))
const gaTrackingStr =
  args.ga &&
  `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${process.env.Google_Analytics_Tracking_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.Google_Analytics_Tracking_ID}');
</script>
`
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
    vendors: ['@babel/polyfill', 'webpack-material-design-icons']
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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader?outputStyle=expanded&indentedSyntax'
        ]
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader?outputStyle=expanded']
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.styl/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
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
      { test: /\.spj$/, type: 'json' }
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
      template: path.join(__dirname, '../src/', 'index.html.ejs'),
      templateParameters: {
        googleTrackingCode: gaTrackingStr
      },
      filename: 'index.html',
      chunksSortMode: 'manual',
      chunks: ['vendors', 'app']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/', 'impress.html.ejs'),
      templateParameters: {
        googleTrackingCode: gaTrackingStr
      },
      filename: 'impress.html',
      chunksSortMode: 'manual',
      chunks: ['vendors', 'impress']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/', 'handouts.html.ejs'),
      templateParameters: {
        googleTrackingCode: gaTrackingStr
      },
      filename: 'handouts.html',
      chunksSortMode: 'manual',
      chunks: ['vendors', 'handouts']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/', 'bespoke.html.ejs'),
      templateParameters: {
        googleTrackingCode: gaTrackingStr
      },
      filename: 'bespoke.html',
      chunksSortMode: 'manual',
      chunks: ['vendors', 'bespoke']
    }),
    new CopyWebpackPlugin([{ from: 'src/favicon.ico' }])
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '..', 'dist'),
    historyApiFallback: true,
    hot: true,
    port: port,
    inline: true
  }
}
