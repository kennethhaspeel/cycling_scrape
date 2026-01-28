import { chromium } from "playwright";
import fs from "fs/promises";

 const baseUrl = "https://www.procyclingstats.com";

async function scrapePage() {
  const browser = await chromium.launch({
    headless: true, // set false for debugging
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  await page.goto("https://www.procyclingstats.com/teams.php", {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  // Wait explicitly for content you want
  await page.waitForSelector("ul.list");

  const data = await page.$$eval("ul.list a", (links) =>
    links.map((a) => ({
      name: a.textContent.trim(),
      href: a.href,
      imageprefix: `${a.href.split('/').pop()}.png` 
    }))
  );
const dLijst = data.filter(x=>x.name !='')
fs.writeFile("teams.json", JSON.stringify(dLijst, null, 2), "utf-8");
console.log("Data saved to teams.json");

const imageUrls = await page.$$eval("ul.list.horizontal img", imgs =>
    imgs.map(img => img.src)
  );

  for (let i = 0; i < imageUrls.length; i++) {
    // Ensure URL is absolute
    const absoluteUrl = new URL(imageUrls[i], baseUrl).href;

    // Fetch image content
    const response = await page.goto(absoluteUrl);
    const buffer = await response.body();

    // Save locally using the last part of the URL as filename
    const filename = absoluteUrl.split("/").pop();
    await fs.writeFile(`teamimage/${filename}`, buffer);

    console.log(`Downloaded ${filename}`);
  }

  await browser.close();
}

scrapePage();
