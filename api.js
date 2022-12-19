const express = require("express");
const router = express.Router();
const scrapeJumia = require("./Scrapers/jumiaScraper");
const pigiaMeScraper = require("./Scrapers/pigiaMescraper");
const jijiScraper = require("./Scrapers/jijiScraper");
const scrapeKilimall = require("./Scrapers/kilimallScraper");

router.get("/api", async (request, response) => {
  let search = request.query.q || request.query.keyword;
  const JumiaUrl = `https://www.jumia.co.ke/catalog/?q=${search}`;
  const PigiaMeUrl = `https://www.pigiame.co.ke/classifieds?q=${search}`;
  const JijiUrl = `https://jiji.co.ke/api_web/v1/listing?q=${search}`;
  const KilimallUrl = `https://api.kilimall.com/ke/v1/product/search?size=40&page=1&brand_id=&keyword=${search}&order=&min=&max=&free_shipping=&have_gift=&logistic_type=&search_type=filter_search`;

  let jumiaScraper = await scrapeJumia.scrapeJumia(JumiaUrl);
  let scrapePigiaMe = await pigiaMeScraper.pigiaMeScraper(PigiaMeUrl);
  let scrapeJiji = await jijiScraper.scrapeJiji(JijiUrl);
  let kilimallScrape = await scrapeKilimall.kilimallScraper(KilimallUrl);

  const jumia = jumiaScraper;
  const pigiame = scrapePigiaMe;
  const jiji = scrapeJiji;
  const kilimall = kilimallScrape;

  const data = [...jumia, ...pigiame, ...jiji, ...kilimall];

  const data2 = data.splice(0, 60);

  response.json(data2);
});

module.exports = router;
