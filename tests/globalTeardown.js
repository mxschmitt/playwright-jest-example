const os = require('os')
const rimraf = require('rimraf')
const path = require('path')

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup')
module.exports = async () => {
  // close the browser instance
  await global.__BROWSER_GLOBAL__.close()

  // clean-up the wsEndpoint file
  rimraf.sync(DIR)
}
