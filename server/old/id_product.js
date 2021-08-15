const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const CronJob = require('cron').CronJob;

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

    $('#productTitle', html).each(function () {
        let title = $(this).text();
        console.log(title); //this thing actually prints the product title
    })

    $('#priceblock_ourprice', html).each(function () {
        let price = $(this).text();
        console.log(price); 
    })
    //id: productTitle
}

async function startTracking() {
    const page = await configureBrowser();

    let job = new CronJob('*/15 * * * * *', function () {
        checkName(page);
    }, null, true, null, null, true);
    job.start();
}

startTracking();

// async function monitor() {
//     let page = await configureBrowser();
//     await checkName(page);
// }

// monitor();