const dataSource = require("../dao/db");
const puppeteer = require("puppeteer");
module.exports = async (message) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(message[1][1]);
    const images = await page.evaluate(() => Array.from(document.images));
    console.log(images.length);
    await browser.close();
  } catch (error) {
    console.error(error.message);
  }
};
