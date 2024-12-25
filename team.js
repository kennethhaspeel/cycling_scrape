const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.procyclingstats.com/teams.php";

axios
  .get(url)
  .then((response) => {
    const html = response.data;

    const $ = cheerio.load(html);
    const data = [];

    const d = $("span.table-cont ul.columns2 li a")

console.log(d.length)
     d.each((index, element) => {
        // console.log(d.text().trim())
        // console.log(d.attr('href'))
        data.push({
            naam:$(element).text().trim(),
            url: $(element).attr('href')
        })
    });

     console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching the webpage:", error);
  });