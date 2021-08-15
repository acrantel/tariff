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

    const searchPrices = await page.$$eval('div.a-row > a.a-size-base > span.a-price > span.a-offscreen', items => items.map( item => item.textContent));
    for(var i = 0; i < searchPrices.length; i++) {
        searchPrices[i] = searchPrices[i].replace('$', '');
    }
    console.log(searchPrices);

    const searchProducts = await page.$$eval('div.a-section > h2.a-size-mini > a.a-link-normal > span.a-size-base-plus', items => items.map( item => item.textContent));
    console.log(searchProducts);

    console.log(searchPrices.length);
    console.log(searchProducts.length);

    // const searchLinks = await page.$$eval('span.a-price > span.a-offscreen', items => items.map( item => item.textContent));

}

async function runSearch() {
    let page = await configureBrowser();
    await searchValue('razors for men', page);
}

runSearch();