const axios = require("axios");
const cheerio = require("cheerio");

const teams = [{ naam: "Uno-X Mobility", url: "team/uno-x-mobility-2025" }];

const data = [];
try {
  for (const team of teams) {
    const url = `https://www.procyclingstats.com/${team.url}`;

    axios.get(url).then((response) => {
      const html = response.data;

      const $ = cheerio.load(html);

      const rijderstabel = $('div.ridersTab[data-code="name"] tbody tr');
      rijderstabel.each((index, element) => {
        const ref = $(element).find("a");
        data.push({
          naam: $(ref).text().trim(),
          url: $(ref).attr("href"),
        });
        console.log(data);
      });
    });
  }
} catch (error) {
  console.log(error);
} finally {
  console.log(data);
}
