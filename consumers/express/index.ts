const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
import { Request, Response } from 'express';
import puppeteer, { Browser } from 'puppeteer';

app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  const message = await run();
  res.json({ message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const run = async () => {
  // Or import puppeteer from 'puppeteer-core';

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto('https://developer.chrome.com/');

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box.
  await page.locator('.devsite-search-field').fill('automate beyond recorder');

  // Wait and click on first result.
  await page.locator('.devsite-result-item-link').click();

  // Locate the full title with a unique string.
  const textSelector = await page
    .locator('text/Customize and automate')
    .waitHandle();
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  await browser.close();
  // Print the full title.
  return fullTitle;
};
