# tariff

Devpost: https://devpost.com/software/tariff

## What it does

Tariff is a Chrome extension that saves users money and raises awareness about the Pink Tax. It helps users find the cheaper men’s equivalents of the women’s version of a product when shopping online.

After installing Tariff, the user can use it on any online shopping site (ex: Amazon). When the user clicks on the Tariff icon in the toolbar, a popup appears with a list of links to cheaper and equivalent men’s products which the user can buy instead.

More than just allowing users to save money, the goal of Tariff is to demonstrate the impact of the Pink Tax on women and the harmful nature of a gendered market. With this increased awareness, our community as a whole can take larger steps towards axing the tax!

## How it works

Tariff searches the page for keywords such as ‘razor’, ‘shampoo’, etc and sends the most prominent keyword to a REST endpoint on our backend server.

Next, our backend server (written with the Express.js framework) scrapes Amazon (with Puppeteer & Cheerio) for less expensive masculine/gender neutral versions of the product, which are then returned to the extension script.

Tariff then displays the list of products in the extension popup window.

## What we built it with

The backend of this project was built with Node.js using the Express.js framework and the frontend was built with React.js and Typescript. The backend uses the Cheerio and Puppeteer libraries to perform web scraping.
