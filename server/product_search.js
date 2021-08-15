const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = 'https://www.amazon.com/'; 

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function searchValue(value, page) {
    //enters value into search box
    await page.type('#twotabsearchtextbox', value);
    await page.$eval( '#nav-search-submit-button', form => form.click() );
    await timeout(2000);
    await page.screenshot({path: 'example.png'});
    const searchPrices = await page.$$eval('span.a-price', items => items.map( item => item.textContent));
    for(var i = 0; i < searchPrices.length; i++) {
        searchPrices[i] = searchPrices[i].replace('$', '');
    }


    console.log(searchPrices);
    // let html = await page.evaluate(() => document.body.innerHTML);
    // console.log(html);
    // await page.waitForSelector('#resultsCol');
    // const firstProduct = await page.$('a.a-link-normal.a-text-normal');
    // console.log(firstProduct);
    // await checkSearchedText(page);
}

async function runSearch() {
    let page = await configureBrowser();
    await searchValue('razors for men', page);
}

runSearch();