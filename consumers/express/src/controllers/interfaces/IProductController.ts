import { Request, Response } from 'express';
import { PuppeteerNode } from 'puppeteer';
import { IProductRepository } from 'shared';

export default interface IProductController {
  puppeteer: PuppeteerNode;
  register(
    req: Request,
    res: Response
  ): Promise<Response<IProductRepository.RegisterResult>>;
}
