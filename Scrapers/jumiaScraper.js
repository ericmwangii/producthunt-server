const cheerio = require("cheerio");
const fetch = require("isomorphic-fetch");

async function scrapeJumia(url) {
  const res = await fetch(url);
  const data = await res.text();
  let itemInfo = [];
  let items = [];

  const $ = cheerio.load(data);

  $(".core").each((index, element) => {
    const imageUrl = $(element).find("img").attr("data-src");
    const name = $(element).attr("data-name");
    const prc = $(element).attr("data-price");
    const link = $(element).attr("href");
    const source = "Jumia";

    const itemUrl = `https://jumia.co.ke/${link}`;

    const price = "Ksh" + " " + Math.ceil(127.504553734 * prc);

    items[index] = { source, imageUrl, name, price, itemUrl };

    itemInfo = items.filter(function (el) {
      return el.name != undefined;
    });

    // console.log(itemInfo);
  });

  return itemInfo;
}

// scrapeJumia("https://www.jumia.co.ke/catalog/?q=huawei+y5");

module.exports = { scrapeJumia };
