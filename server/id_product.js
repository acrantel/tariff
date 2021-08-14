const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = 'https://www.amazon.com/Gillette-Venus-ComfortGlide-White-Womens/dp/B07N6W7RPC/';

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function checkName(page) {
    await page.reload();
    let html = await page.evaluate(() => document.body.innerHTML);
    // console.log(html);
    const $ = cheerio.load(html);

    $('#productTitle', html).each(function() {
        let title = $(this).text();
        console.log(title); //this thing actually prints the product title
    })

    //id: productTitle
}

async function monitor() {
    let page = await configureBrowser();
    await checkName(page);
}

monitor();