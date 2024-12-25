const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.procyclingstats.com/race/la-fleche-wallone/2024/result";

axios
  .get(url)
  .then((response) => {
    const html = response.data;

    const $ = cheerio.load(html);
    const data = [];
    const d = $("table.results tbody tr")
    d.each((index,element)=>{
        let rnk = $(element).find('td:nth-child(1)').text().trim()
        if(index < 50 && rnk !='DNF')
        {
            const tdRider = $(element).find('td:nth-child(5) a').text().trim()
            console.log(tdRider)
        }
    })

    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching the webpage:", error);
  });
