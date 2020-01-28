require('regenerator-runtime/runtime')
const { chromium } = require('playwright')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const os = require('os')

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup')

module.exports = async () => {
  const config = {
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    webSocket: true,
  }
  const browserServer = await chromium.launchBrowserApp(config)
  const browserWSEndpoint = browserServer.wsEndpoint()

  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browserServer

  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR)
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browserWSEndpoint)
}
