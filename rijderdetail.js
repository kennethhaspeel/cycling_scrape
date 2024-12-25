const axios = require("axios");
const cheerio = require("cheerio");

const rijders = [
  {
    naam: "JOHANNESSEN Tobias Halland",url: "rider/tobias-halland-johannessen",
  },
  { naam: "WÆRENSKJOLD Søren", url: "rider/soren-waerenskjold" },
];

const data = [];
try {
  for (const rijder of rijders) {
    const url = `https://www.procyclingstats.com/${rijder.url}`;

    axios.get(url).then((response) => {
      const html = response.data;

      const $ = cheerio.load(html);

      const naam = $("div.main h1").text().trim();
      const afbeelding = $("div.rdr-img-cont img").attr("src");

      const vlag = $("span.flag").attr("class");
      const vlaglijst = vlag.split(" ");

      const nationaliteit = $("div.rdr-info-cont a.black").text();

      const rankings = $("ul.rdr-rankings");
      const ranking = $(rankings).find("li:nth-child(2) div.rnk").text();

      const rijder = {
        naam: naam,
        afbeelding: afbeelding,
        vlag: vlaglijst[1],
        nationaliteit: nationaliteit,
        uciranking: ranking,
      };

      data.push(rijder);
      console.log(rijder);
    });
  }
} catch (error) {
  console.log(error);
} finally {
  console.log(data);
}

// url naar vlag https://flagcdn.com/ua.svg
