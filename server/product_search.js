const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

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
  await page.screenshot({ path: "example.png" });

  const result = [];
  await page.$$eval(
    "div.s-result-item > div.sg-col-inner",
    (productWidgets) => {
      productWidgets.forEach((product) => {
        const cheerioProduct = cheerio.load(product);

        const priceStr = cheerioProduct(
          "span.a-price > span.a-offscreen"
        ).text();

        const name = cheerioProduct(
          "div.a-section > h2.a-size-mini > a.a-link-normal > span.a-size-base-plus"
        ).text();

        result.push({
          price: priceStr.replace("$", ""),
          name,
        });
      });
    }
  );
  console.log(result);
  console.log("klsdjf");

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
