import { Request, Response } from 'express';
import { Browser, PuppeteerNode } from 'puppeteer';
import { ProductRepository } from 'shared';

export default interface IProductController {
  puppeteer: PuppeteerNode;
  register(
    req: Request,
    res: Response
  ): Promise<Response<ProductRepository.RegisterResult>>;
}
