if (process.argv.indexOf('--browsers') < 0) {
  const ChromiumRevision = require('puppeteer/package.json').puppeteer
    .chromium_revision
  const Downloader = require('puppeteer/utils/ChromiumDownloader')
  const revisionInfo = Downloader.revisionInfo(
    Downloader.currentPlatform(),
    ChromiumRevision
  )
  process.env.CHROME_BIN = revisionInfo.executablePath
}

const webpackCfg = require('./webpack.config')
module.exports = function(config) {
  let reporters = ['mocha', 'coverage']
  // don't run coverage in watch (CI) mode
  if (config.autoWatch && !config.singleRun) {
    reporters = ['mocha']
  }
  config.set({
    basePath: '',
    browsers: ['ChromeHeadless'],
    files: ['test/loadtests.js'],
    port: 8080,
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
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackCfg,
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{ type: 'html' }, { type: 'text' }]
    },
    concurrency: Infinity
  })
}
