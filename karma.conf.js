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
    reporters: ['mocha', 'coverage'],
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{ type: 'html' }, { type: 'text' }]
    },
    concurrency: Infinity
  })
}
