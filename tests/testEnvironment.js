const NodeEnvironment = require('jest-environment-node')
const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')
const os = require('os')

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup')

class PlaywrightEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup()
    // get the wsEndpoint
    const browserWSEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8')
    if (!browserWSEndpoint) {
      throw new Error('wsEndpoint not found')
    }

    // connect to Playwright
    this.global.__BROWSER__ = await chromium.connect({
      browserWSEndpoint,
    })
  }

  async teardown() {
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PlaywrightEnvironment
