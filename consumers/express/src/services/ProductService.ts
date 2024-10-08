import {
  Browser,
  KeyInput,
  Page,
  PuppeteerNode,
  QueryOptions,
} from 'puppeteer';
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
  async firstStep(
    product: IProductInput
  ): Promise<IProductService.RegisterResult> {
    try {
      await this.registeringFirstStep(product);
      return { message: 'ok', status: 200 };
    } catch (error) {
      return { message: 'fail', status: 500 };
    }
  }
  async secondStep(
    product: IProductInput
  ): Promise<IProductService.RegisterResult> {
    try {
      await this.registeringSecondStep(product);
      return { message: 'ok', status: 200 };
    } catch (error) {
      return { message: 'fail', status: 500 };
    }
  }
  async thirdStep(
    product: IProductInput
  ): Promise<IProductService.RegisterResult> {
    try {
      await this.registeringThirdStep(product);
      return { message: 'ok', status: 200 };
    } catch (error) {
      return { message: 'fail', status: 500 };
    }
  }
  async fourthStep(
    product: IProductInput
  ): Promise<IProductService.RegisterResult> {
    try {
      await this.registeringFourthStep(product);
      return { message: 'ok', status: 200 };
    } catch (error) {
      return { message: 'fail', status: 500 };
    }
  }

  async openBrowser(): Promise<void> {
    ProductService.browser = await ProductService.puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1000,
        height: 700,
      },
    });
  }

  async accessWebsiteInANewTabAndLogin(): Promise<void> {
    ProductService.page = await ProductService.browser.newPage();

    await ProductService.page.goto(this.url);
    // await ProductService.page.setViewport({ width: 1080, height: 1024 });
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
      '.mat-icon.notranslate.mat-suffix-icon.material-icons.mat-ligature-font.mat-icon-no-color.ng-tns-c2794762957-9'
    );
  }

  async registeringSecondStep(product: IProductInput) {
    const { code } = product;
    const announce = await this.waitForeverForElement('text/Anunciar');
    await announce?.click();
    await ProductService.page.waitForNetworkIdle();
    const elementHandle = await this.waitForeverForElement(
      '#userAccounts mat-select'
    );
    await elementHandle?.click();
    await this.click('text/ DoisS', 1, undefined, 777);
    await this.click('text/ Frango Car Autopeças', 1, undefined, 777);
    await this.click(
      'text/Selecione as contas em que deseja publicar o anúncio:',
      1,
      undefined,
      777
    );
    await this.click('text/Avançar', 1, undefined, 777);
    await this.click('text/Avançar', 1, undefined, 777);
    await this.click('text/navigate_next', 1, undefined, 777);
    await this.click('text/Avançar', 1, undefined, 777);
    await this.click('text/Avançar', 1, undefined, 777);
    await this.click('text/Avançar', 1, undefined, 777);

    //ficha técnica

    await this.waitForeverForElement(
      'text/Preencha as informações de ficha técnica do seu produto:'
    );

    await this.wait(500);

    await this.clickAndWrite('text/ Número de peça ', code);
    await this.clickAndWrite('text/Número de peça *', code);
    await this.clickAndWrite('text/ Origem ', 'Brasil');
    await this.clickAndWrite('text/ Fonte do produto ', 'Original');

    await this.click('text/ Tipo de veículo ');
    await this.click('text/ Carro/Caminhonete ');

    await this.clickYes('text/ Requer programação ');
    await this.clickTab('text/ Com Bluetooth ');
    await this.clickTab("text/ É à prova d'água ");
    await this.clickTab('text/ Com lampadas LED para visão noturna ');
    await this.clickTab('text/ Com aplicativo móvel ');
    await this.clickTab('text/ Com Wi-Fi ');
    await this.clickTab('text/ Com direção assistida ');
    await this.clickTab('text/ Inclui fios ');
    await this.clickTab('text/ Com microfone ');
    await this.clickTab('text/ Com sensor de movimento ');
    await this.clickTab('text/ Com gravação em loop ');
    await this.clickTab('text/ Inclui ecrã ');
    await this.clickTab('text/ É compatível com armazenamento SD ');
    await this.clickTab('text/ Inclui junta ');
    await this.clickTab('text/ Inclui sensor de posição ');
    await this.clickTab('text/ Inclui atuador de marcha lenta ');
    await this.clickTab('text/ Inclui parafusos de montagem ');
    await this.clickTab('text/ Com buzzer ');

    await this.clickSpace('text/ Grampos incluídos ');

    await this.clickWriteTabSpaceCm('text/ Comprimento ', '1');
    await this.clickWriteTabSpaceCm('text/ Diâmetro da rosca ', '1');
    await this.clickWriteTabSpaceCm('text/ Tamanho da rosca ', '1');
    await this.clickWriteTabSpaceCm('text/ Altura ', '1');
    await this.clickWriteTabSpaceCm('text/ Diâmetro ', '1');
    await this.clickWriteTabSpaceCm('text/ Diâmetro do corpo ', '1');
    await this.clickWriteTabSpaceCm('text/ Diâmetro do eixo ', '1');
    await this.clickWriteTabSpaceCm('text/ Largura ', '1');
    await this.clickWriteTabSpaceCm('text/ Diâmetro externo ', '1');
    await this.clickWriteTabSpaceCm(
      'text/ Diâmetro interno das pontas da mangueira de intercooler ',
      '1'
    );
    await this.clickWriteTabSpaceCm('text/ Distância entre injetores ', '1');

    await this.clickWriteTabSpaceSpace(
      'text/ Comprimento do módulo de controle do motor ',
      '1'
    );
    await this.clickWriteTabSpaceSpace(
      'text/ Anchura do módulo de controle do motor ',
      '1'
    );
    await this.clickWriteTabSpaceSpace(
      'text/ Capacidade de armazenamento ',
      '1'
    );
    await this.clickWriteTabSpaceSpace('text/ Ângulo de visão ', '1');
    await this.clickWriteTabSpaceSpace('text/ Peso ', '1');

    await this.clickWriteTabSpaceSpace('text/ Resolução de vídeo ', '1');
    await this.clickWriteTabSpaceDownSpace('text/ Tamanho da tela ', '1');
    await this.clickWriteTabSpaceDownSpace(
      'text/ Diâmetro interno da mangueira de admissão ',
      '1'
    );
    await this.clickWriteTabSpaceDownSpace(
      'text/ Diâmetro do porto de saída da bomba de direção ',
      '1'
    );
    await this.clickWriteTabSpaceDownSpace(
      'text/ Circunferência da carcaça ',
      '1'
    );
    await this.clickWriteTabSpaceDownSpace(
      'text/ Distância entre os pés de montagem ',
      '1'
    );
    await this.clickWriteTabSpaceDownSpace(
      'text/ Diâmetro do porto de entrada da bomba de direção ',
      '1'
    );

    await this.clickTabTabSpace('text/ Voltagem ');
    await this.clickTabTabSpace('text/ Material da mangueira de admissão ');
    await this.clickTabTabSpace(
      'text/ Diâmetro externo da mangueira de admissão '
    );
    await this.clickTabTabSpace('text/ Tipo de sistema de combustível ');

    await this.clickTabSpace('text/ Linha ');
    await this.clickTabSpace('text/ Material da mangueira de intercooler ');
    await this.clickTabSpace('text/ Pressão de trabalho máxima ');
    await this.clickTabSpace('text/ Número de registro/certificação ');
    await this.clickTabSpace('text/ Código OEM ');
    await this.clickTabSpace('text/ Código universal de produto ');
    await this.clickTabSpace('text/ Fabricante ');
    await this.clickTabSpace('text/ Homologação Anatel Nº ');
    await this.clickTabSpace('text/ Tipo de injeção ');
    await this.clickTabSpace('text/ Com tela digital ');
    await this.clickTabSpace('text/ Modelo alfanumérico ');
    await this.clickTabSpace('text/ Quantidade de injetores ');
  }

  async registeringThirdStep(product: IProductInput) {
    const { id, name, brand, model, year, code, title, price } = product;
    await this.click('text/ Alterar Compatibilidade ');
    const thirdStepTitle = await this.waitForeverForElement(
      'text/Veículos compatíveis'
    );

    const replace = (str: string, brand: boolean = false) => {
      //caso brand, usar o json aqui pra poder usar GM, ex, json[str] (ex: json['gm'] ou json['chevrolet'] pra sair chevrolet)
      const target = brand ? str : str;
      return target.toLowerCase().trim().replace('-', '');
    };

    const chooseCompatibilitieForWords = async (
      className: string,
      searchBy: string,
      brand: boolean = false
    ): Promise<boolean> => {
      let res = false;
      const searchByArr = searchBy.split(' ').reverse();
      for (let index = 0; index < searchByArr.length; index++) {
        let toSearch = '';
        for (let i = searchByArr.length - 1; i >= index; i--) {
          if (
            await chooseCompatibilitie(className, searchByArr[index], brand)
          ) {
            res = true;
            break;
          }
          toSearch += ` ${searchByArr[i]}`;
        }
        if ((await chooseCompatibilitie(className, toSearch), brand)) {
          res = true;
          break;
        }
        if (toSearch.split('').length > index + 1) break;
      }
      return res;
    };

    const chooseCompatibilitie = async (
      className: string,
      searchBy: string,
      brand: boolean = false
    ): Promise<boolean> => {
      const elements = ProductService.page.$$(className);
      let res = false;
      for (const el of await elements) {
        const text = await el.evaluate((e) => e.textContent);
        if (!text) break;
        if (replace(text, brand) == replace(searchBy, brand)) {
          await el.click();
          await this.wait(50);
          res = true;
        }
      }
      return res;
    };

    await this.wait(500);
    await this.press('Tab');
    await this.press('Space');
    await this.wait(300);

    const brandRes = await chooseCompatibilitieForWords(
      '.mat-option-text',
      brand,
      true
    );
    if (!brandRes) return;
    await thirdStepTitle?.click();
    await thirdStepTitle?.click();

    await this.wait(500);
    await this.press('Tab');
    await this.press('Tab');
    await this.press('Tab');
    await this.press('Space');
    await this.wait(300);

    const modelRes = await chooseCompatibilitieForWords(
      '.mat-option-text',
      model
    );
    if (!modelRes) return;
    await thirdStepTitle?.click();
    await thirdStepTitle?.click();

    await this.wait(500);
    await this.press('Tab');
    await this.press('Tab');
    await this.press('Tab');
    await this.press('Space');
    await this.wait(300);

    const yearRes = await chooseCompatibilitieForWords(
      '.mat-option-text',
      year
    );
    if (!yearRes) return;
    await thirdStepTitle?.click();
    await thirdStepTitle?.click();

    await this.wait(500);
    await this.press('Tab');
    await this.press('Tab');
    await this.press('Tab');
    await this.press('Space');
    await this.wait(300);

    // await chooseCompatibilitie('.mat-option-text', year);
    await this.click('text/ Selecionar Todos ');
    await thirdStepTitle?.click();
    await thirdStepTitle?.click();

    await this.wait(500);
    await this.press('Tab');
    await this.press('Tab');
    await this.press('Tab');
    await this.press('Space');
    await this.wait(300);

    await this.click('text/ Selecionar ');
    // await this.click('text/ Avançar ');
  }

  async registeringFourthStep(product: IProductInput) {
    const { id, name, brand, model, year, code, title, price } = product;
    await ProductService.page.keyboard.down('ControlLeft');
    await this.press('Home');
    await ProductService.page.keyboard.up('ControlLeft');
    await this.press('ArrowDown');
    await this.press('ArrowDown');
    await this.press('End');
    await this.type(brand);
    await this.press('ArrowDown');
    await this.press('End');
    await this.type(model);
    await this.press('ArrowDown');
    await this.press('End');
    await this.type(year);
    await this.press('ArrowDown');
    await this.press('End');
    await this.type(code);
  }

  async waitForeverForElement(selector: string) {
    return await ProductService.page.waitForSelector(selector, { timeout: 0 });
  }

  async clickYes(selector: string) {
    if (!(await this.elementExists(selector))) return;
    await this.click(selector);
    await this.click('text/ Sim ');
  }

  async clickNo(selector: string) {
    if (!(await this.elementExists(selector))) return;
    await this.click(selector);
    await this.click('text/ Não ');
  }

  async clickTab(selector: string) {
    if (!(await this.elementExists(selector, 20))) return;
    await this.click(selector);
    await this.press('Tab');
  }

  async clickWriteTabSpaceDownSpace(selector: string, text: string) {
    if (!(await this.elementExists(selector, 20))) return;
    await this.clickAndWrite(selector, text);
    await this.press('Tab');
    await this.press('Space');
    await this.press('ArrowDown');
    await this.press('Space');
  }

  async clickWriteTabSpaceDownDownSpace(selector: string, text: string) {
    if (!(await this.elementExists(selector))) return;
    await this.clickAndWrite(selector, text);
    await this.press('Tab');
    await this.press('Space');
    await this.press('ArrowDown');
    await this.press('ArrowDown');
    await this.press('Space');
  }

  async clickWriteTabSpaceSpace(selector: string, text: string) {
    if (!(await this.elementExists(selector, 20))) return;
    await this.clickAndWrite(selector, text, 1, { x: 0, y: 0 });
    await this.clickTabSpaceSpace(selector);
  }

  async click(
    selector: string,
    numberOfClicks: number = 1,
    offset: { x: number; y: number } | undefined = undefined,
    delay: number = 250
  ) {
    if (!(await this.elementExists(selector, delay))) return;
    const selected = ProductService.page.locator(selector);
    await selected.click({ count: numberOfClicks, offset, delay: 10 });
  }

  async clickSpace(
    selector: string,
    numberOfClicks: number = 1,
    offset: { x: number; y: number } | undefined = undefined
  ) {
    if (!(await this.elementExists(selector, 20))) return;
    const selected = ProductService.page.locator(selector);
    await selected.click({ count: numberOfClicks, offset, delay: 10 });
    await this.press('Space');
    await this.wait(50);
  }

  async elementExists(selector: string, delay: number = 200): Promise<boolean> {
    try {
      // 777
      await ProductService.page.waitForSelector(selector, { timeout: delay });
      return true;
    } catch (error) {
      console.log('404 selector: ' + selector);
      return false;
    }
  }

  async clickWriteTabSpaceCm(selector: string, text: string) {
    if (!(await this.elementExists(selector, 40))) return;
    await this.clickAndWrite(selector, text, 1, { x: 0, y: 0 });
    await this.press('Tab');
    await this.press('Space');
    await this.click('text/ cm ');
    await this.wait(50);
  }

  async clickAndWrite(
    selector: string,
    text: string,
    numberOfClicks: number = 1,
    offset: { x: number; y: number } | undefined = undefined
  ) {
    if (!(await this.elementExists(selector, 20))) return;
    const selected = ProductService.page.locator(selector);
    await selected.click({ count: numberOfClicks, offset: { x: 10, y: 0 } });
    await this.type(text);
    await this.wait(50);
  }

  async locateAndFill(selector: string, text: string) {
    if (!(await this.elementExists(selector))) return;
    const selected = ProductService.page.locator(selector);
    await selected.fill(text);
    await this.wait(50);
  }

  async clickTabSpace(selector: string) {
    if (!(await this.elementExists(selector, 40))) return;
    await this.click(selector, 2);
    await this.press('Tab');
    await this.press('Space');
    await this.wait(50);
  }

  async clickTabSpaceSpace(selector: string) {
    if (!(await this.elementExists(selector))) return;
    await this.click(selector);
    await this.press('Tab');
    await this.press('Space');
    await this.press('Space');
    await this.wait(50);
  }

  async clickTabTabSpace(selector: string) {
    if (!(await this.elementExists(selector, 20))) return;
    await this.click(selector);
    await this.press('Tab');
    await this.press('Tab');
    await this.press('Space');
    await this.wait(50);
  }

  async type(text: string) {
    await ProductService.page.keyboard.type(text);
  }

  async press(text: KeyInput) {
    await ProductService.page.keyboard.press(text);
  }

  async wait(time: number) {
    await new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  async closeBrowser(): Promise<void> {
    await ProductService.browser.close();
  }
}
