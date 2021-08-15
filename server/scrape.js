const puppeteer = require("puppeteer");
const { assert } = require("console");

const url = "https://www.amazon.com/";

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const scrape = async (searchTerm) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  //enters value into search box
  await page.type("#twotabsearchtextbox", searchTerm);
  await page.$eval("#nav-search-submit-button", (form) => form.click());
  await timeout(2000);

  // actual scraping begins
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

  await browser.close();
  return result;
};

// testing code
// scrape("razor for men").then((value) => {
//   console.log(value);
// });

module.exports.scrape = scrape;
