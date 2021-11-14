const fetch = require("isomorphic-fetch");

async function scrapeJiji(url) {
  const response = await fetch(url);
  const data = await response.json();

  let info = data.adverts_list.adverts;

  //   console.log(info);

  let itemInfo = info.map((el) => ({
    source: "Jiji",
    name: el.title,
    imageUrl: el.image_obj["url"],
    price: el.price_obj["view"],
    itemUrl: `https://jiji.co.ke${el.url}`,
  }));

  // console.log(itemInfo);

  return itemInfo;
}

// scrapeJiji("https://jiji.co.ke/api_web/v1/listing?query=iphone+x");

module.exports = { scrapeJiji };
