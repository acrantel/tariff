const puppeteer = require("puppeteer");
const { assert } = require("console");

const url = "https://www.amazon.com/";

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function configureBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function searchValue(value, page) {
  //enters value into search box
  await page.type("#twotabsearchtextbox", value);
  await page.$eval("#nav-search-submit-button", (form) => form.click());
  await timeout(2000);
  await page.screenshot({ path: "example.png" });

  const searchPrices = await page.$$eval(
    "div.a-row > a.a-size-base > span.a-price:not(.a-text-price) > span.a-offscreen",
    (items) => items.map((item) => item.textContent)
  );
  const searchProducts = await page.$$eval(
    "div.a-section > h2.a-size-mini > a.a-link-normal > span.a-size-base-plus",
    (items) => items.map((item) => item.textContent)
  );

  assert(searchPrices.length === searchProducts.length);

  const result = [];
  for (let i = 0; i < searchPrices.length; i++) {
    const price = parseFloat(searchPrices[i].replace("$", ""));
    const name = searchProducts[i];
    result.push({ price, name });
  }
  console.log(result);
  return result;

  // let html = await page.evaluate(() => document.body.innerHTML);
  // console.log(html);
  // await page.waitForSelector('#resultsCol');
  // const firstProduct = await page.$('a.a-link-normal.a-text-normal');
  // console.log(firstProduct);
  // await checkSearchedText(page);
}

async function runSearch() {
  let page = await configureBrowser();
  await searchValue("shampoo for men", page);
}

runSearch();
