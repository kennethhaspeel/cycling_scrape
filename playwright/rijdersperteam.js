import { chromium } from "playwright";
import fs from "fs/promises";
import { URL } from "url";

const baseUrl = "https://www.procyclingstats.com";
let tabel = [];
async function LeesTeams() {
  const teamList = JSON.parse(await fs.readFile("teams.json"));
  return teamList;
}

//console.log(teamList)
async function scrapeRiders() {
  const teamList = await LeesTeams();
  console.log(teamList);

  for (const team of teamList) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      viewport: { width: 1280, height: 800 },
    });

    const page = await context.newPage();

    await page.goto(team.href, { waitUntil: "networkidle" });

    // Extract all rider <a> elements inside div.mr5
    const riders = await page.$$eval("ul.teamlist li div.mr5 a", (links) =>
      links.map((a) => ({
        naam: a.textContent.trim(),
        href: a.href,
      }))
    );
    console.log(riders);
    riders.forEach((a) => {
      tabel.push({
        ploeg: team.name,
        naam: a.naam,
        href: a.href,
      });
    });
    await browser.close();
  }
  console.log(tabel);

  //   // Optional: Make href relative to baseUrl if needed
  //   const normalizedRiders = riders.map(r => ({
  //     name: r.name,
  //     href: new URL(r.href, baseUrl).href
  //   }));

  //   // Save to JSON
  //   await fs.writeFile("riders.json", JSON.stringify(normalizedRiders, null, 2), "utf-8");

  //   console.log("Rider data saved to riders.json");
}

scrapeRiders();
