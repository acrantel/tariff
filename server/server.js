const express = require("express");
const app = express();
const scraper = require("./scrape");

app.get("/", async (req, res) => {
  const keyword = req.query.keyword;
  console.log("keyword: ", keyword);
  res.json({
    product_list: await scraper.scrape(keyword + " for men"),
  });
});

app.get("/asdf", (req, res) => {
  console.log("happ");
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
