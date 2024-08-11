import { Browser, Page, PuppeteerNode } from 'puppeteer';
import { IProductInput, IProductService } from 'shared';
import puppeteer from 'puppeteer';

export class ProductService implements IProductService.Service {
  static puppeteer: PuppeteerNode = puppeteer;
  static browser: Browser;
  static page: Page;
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
    ProductService.page = await ProductService.browser.newPage();
    await ProductService.page.goto(this.url);
    await ProductService.page.setViewport({ width: 1080, height: 1024 });
    await ProductService.page.locator('[type="email"]').fill(this.login);
    await ProductService.page.locator('[type="password"]').fill(this.password);
    await ProductService.page.locator('[type="submit"]').click();
  }

  async startRegistering(
    product: IProductInput
  ): Promise<IProductService.RegisterResult> {
    const { id, name, brand, model, year, code, title, price } = product;
    // await this.locateAndFill('#mat-input-12', '1');
    // await this.locateAndFill('#mat-input-13', price);
    // await this.locateAndFill('#mat-input-3', id);
    // await this.locateAndFill('#mat-input-4', title);
    // await this.locateAndFill('#brand', brand);
    // await this.locateAndFill('#model', model);
    // await this.locateAndFill('#year', year);
    // await this.click('text/Selecionar Fotos');
    // await ProductService.page.waitForSelector('.piece-delete-image');
    // await this.click(
    //   '.mat-icon.notranslate.mat-suffix-icon.material-icons.mat-ligature-font.mat-icon-no-color.ng-tns-c2794762957-7'
    // );

    //anuncio
    const announce = await ProductService.page.waitForSelector('text/Anunciar');
    await announce?.click();
    await ProductService.page.waitForNetworkIdle();
    const elementHandle = await ProductService.page.waitForSelector(
      '#userAccounts mat-select'
    );
    await elementHandle?.click();
    await this.click('text/DoisS');
    await this.click('text/Frango Car Autopeças');
    await this.click(
      'text/Selecione as contas em que deseja publicar o anúncio:'
    );
    await this.click('text/Avançar');
    await this.click('text/Avançar');
    await this.click('text/navigate_next');
    await this.click('text/Avançar');
    await this.click('text/Avançar');
    await this.click('text/Avançar');

    //ficha técnica
    await this.clickAndWrite('text/Número de peça', code);

    await this.writeClickTabSpace(
      'text/Comprimento do módulo de controle do motor',
      '1'
    );

    await this.clickAndWrite('text/Origem', 'Brasil');
    await this.clickAndWrite('text/Fonte do produto', 'Original');

    await this.click('text/Tipo de veículo');
    await this.click('text/Carro/Caminhonete');

    await this.click('text/Requer programação');
    await this.click('text/ Sim ');

    await this.clickTabSpace('text/Número de registro/certificação');
    await this.clickTabSpace('text/Código OEM');

    console.log('ok');

    return { message: 'Done', status: 200 };
  }

  async click(selector: string, numberOfClicks: number = 1) {
    const selected = ProductService.page.locator(selector);
    if (!selected) return;
    await selected.click({ count: numberOfClicks, delay: 150 });
  }
  async writeClickTabSpace(selector: string, text: string) {
    await this.clickAndWrite(selector, text);
    await this.clickTabSpace(selector);
  }

  async clickAndWrite(
    labelText: string,
    text: string,
    numberOfClicks: number = 1
  ) {
    const selected = ProductService.page.locator(labelText);
    if (!selected) return;
    await selected.click({ count: numberOfClicks, delay: 150 });
    await this.type(text);
  }

  async locateAndFill(selector: string, text: string) {
    const selected = ProductService.page.locator(selector);
    if (!selected) return;
    await selected.fill(text);
  }

  async clickTabSpace(selector: string) {
    await this.click(selector);
    await ProductService.page.keyboard.press('Tab');
    await ProductService.page.keyboard.press('Space');
  }

  async type(text: string) {
    await ProductService.page.keyboard.type(text);
  }

  async wait(time: number = 1000) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, time);
    });
  }

  async closeBrowser(): Promise<void> {
    await ProductService.browser.close();
  }
}
