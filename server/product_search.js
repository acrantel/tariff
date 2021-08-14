const assert = require('assert')
const puppeteer = require('puppeteer')
let browser
let page

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
}

describe('Amazon Homepage', () => {
  it('has search input', async () => {
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.amazon.com', { waitUntil: 'networkidle0' })
    const searchInput = await page.$('#twotabsearchtextbox')
    assert.ok(searchInput)
    await page.screenshot({ path: 'amz.png' })
  }).timeout(20000)

  it('shows search results after search input', async () => {
    await page.type('#twotabsearchtextbox', 'razor for women')
    await page.click('input.nav-input')
    await page.waitForSelector('#resultsCol')
    const firstProduct = await page.$('a.a-link-normal.a-text-normal')
    assert.ok(firstProduct)
  }).timeout(10000)
})

after(async () => {
  await browser.close()
})