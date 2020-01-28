

let page

beforeAll(async () => {
  const context = await global.__BROWSER__.newContext()
  page = await context.newPage()
})

describe('Google', () => {
  it('should find the corresponding Microsoft card on the right side if you search for Microsoft', async () => {
    await page.goto("https://www.google.com")
    await page.type("input[name=q]", "Microsoft")
    await page.keyboard.press('Enter');
    await page.waitForNavigation({
      waitUntil: "networkidle2"
    })
    await page.screenshot({ path: 'screenshot.png' })
    const dataTitle = await page.$eval('div[data-attrid="title"] > span', el => el.textContent)
    expect(dataTitle).toBe("Microsoft")
  })
})

