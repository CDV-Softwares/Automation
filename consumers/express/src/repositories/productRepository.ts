import { IProductInput, IProductRepository } from 'shared';

export class ProductRepository implements IProductRepository.Repository {
  constructor() {}
  async register(
    product: IProductInput
  ): Promise<IProductRepository.RegisterResult> {
    console.log('repo');
    product;
    const { id, name, brand, model, year, code, title } = product;
    console.log(id, name, brand, model, year, code, title);

    // const browser = await this.puppeteer.launch({ headless: false });
    // const page = await browser.newPage();

    // const { USERNAME, PASSWORD, PLATAFORM_URL } = process.env;
    // await page.goto(String(PLATAFORM_URL));

    // await page.setViewport({ width: 1080, height: 1024 });
    // await page.locator('[type="email"]').fill(String(USERNAME));
    // await page.locator('[type="password"]').fill(String(PASSWORD));
    // await page.locator('[type="submit"]').click();

    // await browser.close();
    return { message: '', status: 200 };
  }
}
