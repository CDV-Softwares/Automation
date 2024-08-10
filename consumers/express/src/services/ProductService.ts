import { Browser, PuppeteerNode } from 'puppeteer';
import { IProductInput, IProductService } from 'shared';
import puppeteer from 'puppeteer';

export class ProductService implements IProductService.Service {
  static puppeteer: PuppeteerNode = puppeteer;
  static browser: Browser;
  constructor(
    public url: string,
    public login: string,
    public password: string
  ) {}

  async openBrowser(): Promise<void> {
    ProductService.browser = await ProductService.puppeteer.launch({
      headless: false,
    });
  }

  async accessWebsiteInANewTabAndLogin(): Promise<void> {
    const page = await ProductService.browser.newPage();
    await page.goto(this.url);

    await page.setViewport({ width: 1080, height: 1024 });

    await page.locator('[type="email"]').fill(this.login);
    await page.locator('[type="password"]').fill(this.password);
    await page.locator('[type="submit"]').click();
    await page.content();
  }

  async startRegistering(
    product: IProductInput
  ): Promise<IProductService.RegisterResult> {
    const { id, name, brand, model, year, code, title } = product;
    console.log(id, name, brand, model, year, code, title);

    return { message: '', status: 200 };
  }

  async closeBrowser(): Promise<void> {
    await ProductService.browser.close();
  }
}
