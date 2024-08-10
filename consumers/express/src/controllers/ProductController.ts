import { Request, Response } from 'express';
import { ProductRepository } from 'shared';
import IProductController from './interfaces/IProductController';
import { Browser, PuppeteerNode } from 'puppeteer';

export default class ProductController implements IProductController {
  constructor(public puppeteer: PuppeteerNode) {}
  async register(
    req: Request,
    res: Response
  ): Promise<Response<ProductRepository.RegisterResult>> {
    try {
      const { id, name, brand, model, year, code } = req.body;
      console.log(id, name, brand, model, year, code);

      const browser = await this.puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      const { USERNAME, PASSWORD, PLATAFORM_URL } = process.env;
      await page.goto(String(PLATAFORM_URL));

      await page.setViewport({ width: 1080, height: 1024 });
      await page.locator('[type="email"]').fill(String(USERNAME));
      await page.locator('[type="password"]').fill(String(PASSWORD));
      await page.locator('[type="submit"]').click();

      await browser.close();

      return res.json({ message: 'Done.' }).status(200);
    } catch (error) {
      console.log(error);

      return res.json({ message: 'Serverside err' }).status(500);
    }
  }
}
