

let page

beforeAll(async () => {
  const context = await global.__BROWSER__.newContext()
  page = await context.newPage()
})

describe('Example Domain', () => {
  it('should check if the heading matches the expected one', async () => {
    await page.goto("https://example.com")
    const heading = await page.$eval('h1', el => el.textContent)
    expect(heading).toBe("Example Domain")
  })
  it('should be able to make a screenshot of the site', async () => {
    await page.screenshot({ path: 'screenshot.png' })
  })
})

