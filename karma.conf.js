let path = require('path')
if (process.argv.indexOf('--browsers') < 0) {
  process.env.CHROME_BIN = require('puppeteer').executablePath()
}

const webpackCfg = require('./webpack.config')
module.exports = function(config) {
  process.env.BABEL_ENV = 'test'
  let reporters = ['mocha', 'coverage']
  // don't run coverage in watch (CI) mode
  if (config.autoWatch && !config.singleRun) {
    reporters = ['mocha']
  }
  config.set({
    basePath: '',
    browsers: ['ChromeHeadless'],
    files: ['test/loadTests.js'],
    captureTimeout: 60000,
    frameworks: ['mocha', 'chai'],
    client: {
      mocha: {}
    },
    colors: true,
    singleRun: true,
    logLevel: config.LOG_INFO,
    reporters: reporters,
    preprocessors: {
      'test/loadTests.js': ['webpack'],
      'src/**/*.js': 'coverage'
    },
    webpack: webpackCfg,
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{ type: 'html' }, { type: 'text' }]
    }
  })
}
