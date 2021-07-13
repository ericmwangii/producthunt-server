const fetch = require("isomorphic-fetch");

async function kilimallScraper(url) {
  const res = await fetch(url);
  const data = await res.json();

  let info = data.data.products;

  let itemInfo = info.map((el) => ({
    source: "Kilimall",
    name: el.name,
    imageUrl: el.images["ORIGIN"],
    price: el.price_unit,
  }));

  // console.log(itemInfo);

  return itemInfo;
}

module.exports = { kilimallScraper };
