const axios = require("axios");
const cheerio = require("cheerio");
const https = require('https');

const url = "https://www.procyclingstats.com/teams.php";
// const httpsAgent = new https.Agent({
// rejectUnauthorized: false,
// });

axios
  .get(url, {
      headers: {
           "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept":
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": url
      }
    })
  .then((response) => {
//     const html = response.data;

//     const $ = cheerio.load(html);
//     const data = [];

//     const d = $("span.table-cont ul.columns2 li a")

// console.log(d.length)
//      d.each((index, element) => {
//         // console.log(d.text().trim())
//         // console.log(d.attr('href'))
//         data.push({
//             naam:$(element).text().trim(),
//             url: $(element).attr('href')
//         })
//     });

     console.log(response);
  })
  .catch((error) => {
    console.error("Error fetching the webpage:", error);
  });