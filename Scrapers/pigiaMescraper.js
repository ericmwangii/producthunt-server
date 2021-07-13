const cheerio = require("cheerio");
const fetch = require("isomorphic-fetch");

async function pigiaMeScraper(url) {
  const res = await fetch(url);
  const data = await res.text();

  let itemInfo = [];

  const $ = cheerio.load(data);

  $(".listing-card__inner").each((index, element) => {
    const imageUrl = $(element).find("img").attr("src");
    const name = $(element).attr("data-t-listing_title");
    const prc = $(element).attr("data-t-listing_price");
    const itemUrl = $(element).attr("href");
    const source = "PigiaMe";
    const price = "Ksh" + " " + prc;

    itemInfo[index] = { source, imageUrl, name, price, itemUrl };

    // console.log(itemInfo);
  });
  return itemInfo;
}

// pigiaMeScraper("https://www.pigiame.co.ke/classifieds?q=samsung+p20");

module.exports = { pigiaMeScraper };
