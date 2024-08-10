require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
import { RegisterProductUsercase } from 'application';
import { Request, Response } from 'express';
import puppeteer, { Browser } from 'puppeteer';

app.use(cors());
app.use(express.json());

app.post('/new-product', async (req: Request, res: Response) => {
  try {
    const { name, brand, model, year, code } = req.body;
    console.log(name, brand, model, year, code);

    await run();
    res.json({ message: 'Done.' });
  } catch (error) {
    res.json({ message: 'Serverside err' }).status(500);
  }
});

let browser: Browser;

app.listen(port, async () => {
  browser = await puppeteer.launch({ headless: false });
  console.log(`Example app listening on port ${port}`);
});

const run = async () => {
  // Or import puppeteer from 'puppeteer-core';

  // Launch the browser and open a new blank page
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  const { USERNAME, PASSWORD, PLATAFORM_URL } = process.env;
  await page.goto(String(PLATAFORM_URL));

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 });
  await page.locator('[type="email"]').fill(String(USERNAME));
  await page.locator('[type="password"]').fill(String(PASSWORD));
  await page.locator('[type="submit"]').click();

  // Type into search box.
  // await page.locator('.devsite-search-field').fill('automate beyond recorder');

  // Wait and click on first result.
  // await page.locator('.devsite-result-item-link').click();

  // Locate the full title with a unique string.
  // const textSelector = await page
  //   .locator('text/Customize and automate')
  //   .waitHandle();
  // const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  await browser.close();
  // Print the full title.
};
