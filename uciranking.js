const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.procyclingstats.com/rankings.php?date=2024-11-19&page=smallerorequal&offset=0&filter=Filter&p=me&s=uci-individual";

axios
  .get(url)
  .then((response) => {
    const html = response.data;

    const $ = cheerio.load(html);
    const data = [];
    const d = $("table.basic tbody tr")
console.log(d.length)
    d.each((index, element) => {
      const rank = $(element).find("td:nth-child(1)").text().trim();
      const naam = $(element).find("td:nth-child(4)").text().trim();
      const team = $(element).find("td:nth-child(5)").text().trim();

      if (rank && naam && team) {
        data.push({ rank,naam,team });
      }
    });

    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching the webpage:", error);
  });
