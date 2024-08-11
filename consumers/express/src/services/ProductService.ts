import { Browser, KeyInput, Page, PuppeteerNode } from 'puppeteer';
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

  async startRegistering(
    product: IProductInput
  ): Promise<IProductService.RegisterResult> {
    // await this.registeringFirstStep(product);
    await this.registeringSecondStep();
    await this.registeringThirdStep(product);
    await this.registeringFourthStep(product);
    console.log('ok');

    return { message: 'Done', status: 200 };
  }

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

  async registeringFirstStep(product: IProductInput) {
    const { id, brand, model, year, title, price } = product;
    await this.locateAndFill('#mat-input-12', '1');
    await this.locateAndFill('#mat-input-13', price);
    await this.locateAndFill('#mat-input-3', id);
    await this.locateAndFill('#mat-input-4', title);
    await this.locateAndFill('#brand', brand);
    await this.locateAndFill('#model', model);
    await this.locateAndFill('#year', year);
    await this.click('text/ Selecionar Fotos');
    await this.waitForeverForElement('.piece-delete-image');
    await this.click(
      '.mat-icon.notranslate.mat-suffix-icon.material-icons.mat-ligature-font.mat-icon-no-color.ng-tns-c2794762957-7'
    );
  }

  async registeringSecondStep() {
    const announce = await this.waitForeverForElement('text/Anunciar');
    await announce?.click();
    await ProductService.page.waitForNetworkIdle();
    const elementHandle = await this.waitForeverForElement(
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
    // await this.press('Tab');
    // await this.press('Tab');
    // await this.press('Space');
    await this.click('text/Avançar');
    await this.click('text/Avançar');
    await this.click('text/Avançar');
  }

  async registeringThirdStep(product: IProductInput) {
    const { code } = product;
    await this.clickAndWrite('text/ Número de peça ', code);
    await this.clickAndWrite('text/ Origem ', 'Brasil');
    await this.clickAndWrite('text/ Fonte do produto ', 'Original');

    await this.click('text/ Tipo de veículo ');
    await this.click('text/ Carro/Caminhonete ');

    await this.clickYes('text/ Requer programação ');

    await this.clickSpace('text/ Grampos incluídos ');

    await this.clickWriteTabSpaceCm('text/ Comprimento ', '1');
    await this.clickWriteTabSpaceCm('text/ Diâmetro externo ', '1');
    await this.clickWriteTabSpaceCm(
      'text/ Diâmetro interno das pontas da mangueira de intercooler ',
      '1'
    );

    await this.writeClickTabSpaceSpace(
      'text/ Comprimento do módulo de controle do motor ',
      '1'
    );
    await this.writeClickTabSpaceSpace(
      'text/ Anchura do módulo de controle do motor ',
      '1'
    );

    await this.clickTabSpace('text/ Material da mangueira de intercooler ');
    await this.clickTabSpace('text/ Pressão de trabalho máxima ');
    await this.clickTabSpace('text/ Número de registro/certificação ');
    await this.clickTabSpace('text/ Código OEM ');

    //enriquecer com mais preenchimentos automaticos aqui
    await this.waitForeverForElement('text/ Alterar Compatibilidade ');
  }

  async registeringFourthStep(product: IProductInput) {
    const { id, name, brand, model, year, code, title, price } = product;
    await this.click('text/ Alterar Compatibilidade');
    await this.waitForeverForElement('text/ Veículos compatíveis');
    await this.click('text/ Marca *');
  }

  async waitForeverForElement(selector: string) {
    return await ProductService.page.waitForSelector(selector, { timeout: 0 });
  }

  async click(
    selector: string,
    numberOfClicks: number = 1,
    offset: { x: number; y: number } | undefined = undefined
  ) {
    if (!(await this.elementExists(selector))) return;
    const selected = ProductService.page.locator(selector);
    await selected.click({ count: numberOfClicks, offset, delay: 250 });
  }

  async clickYes(selector: string) {
    await this.click(selector);
    await this.click('text/ Sim ');
  }

  async clickNo(selector: string) {
    await this.click(selector);
    await this.click('text/ Não');
  }

  async clickSpace(
    selector: string,
    numberOfClicks: number = 1,
    offset: { x: number; y: number } | undefined = undefined
  ) {
    if (!(await this.elementExists(selector))) return;
    const selected = ProductService.page.locator(selector);
    await selected.click({ count: numberOfClicks, offset, delay: 250 });
    await this.press('Space');
  }

  async writeClickTabSpaceSpace(selector: string, text: string) {
    if (!(await this.elementExists(selector))) return;
    await this.clickAndWrite(selector, text, 1, { x: 0, y: 0 });
    await this.clickTabSpaceSpace(selector);
  }

  async elementExists(selector: string): Promise<boolean> {
    try {
      await ProductService.page.waitForSelector(selector, { timeout: 777 });
      return true;
    } catch (error) {
      console.log('404 selector: ' + selector);
      return false;
    }
  }

  async clickWriteTabSpaceCm(selector: string, text: string) {
    if (!(await this.elementExists(selector))) return;
    await this.clickAndWrite(selector, text, 1, { x: 0, y: 0 });
    await this.press('Tab');
    await this.press('Space');
    await this.click('text/ cm ');
  }

  async clickAndWrite(
    labelText: string,
    text: string,
    numberOfClicks: number = 1,
    offset: { x: number; y: number } | undefined = undefined
  ) {
    if (!(await this.elementExists(labelText))) return;
    const selected = ProductService.page.locator(labelText);
    await selected.click({ count: numberOfClicks, offset });
    await this.type(text);
  }

  async locateAndFill(selector: string, text: string) {
    if (!(await this.elementExists(selector))) return;
    const selected = ProductService.page.locator(selector);
    await selected.fill(text);
  }

  async clickTabSpace(selector: string) {
    if (!(await this.elementExists(selector))) return;
    await this.click(selector, 2);
    await this.press('Tab');
    await this.press('Space');
  }

  async clickTabSpaceSpace(selector: string) {
    if (!(await this.elementExists(selector))) return;
    await this.click(selector);
    await this.press('Tab');
    await this.press('Space');
    await this.press('Space');
  }

  async clickTabTabSpace(selector: string) {
    if (!(await this.elementExists(selector))) return;
    await this.click(selector);
    await this.press('Tab');
    await this.press('Space');
    await this.press('Space');
  }

  async type(text: string) {
    await ProductService.page.keyboard.type(text);
  }

  async press(text: KeyInput) {
    await ProductService.page.keyboard.press(text);
  }

  async closeBrowser(): Promise<void> {
    await ProductService.browser.close();
  }
}
