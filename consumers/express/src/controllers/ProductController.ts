import { Request, Response } from 'express';
import { IProduct, IProductRepository } from 'shared';
import IProductController from './interfaces/IProductController';
import { PuppeteerNode } from 'puppeteer';
import { ProductInputMapper, RegisterProductUsecase } from 'application';

export default class ProductController implements IProductController {
  constructor(
    private registerProductUsecase: RegisterProductUsecase.Usecase,
    public puppeteer: PuppeteerNode
  ) {}
  async register(
    req: Request,
    res: Response
  ): Promise<Response<IProductRepository.RegisterResult>> {
    try {
      const { id, name, brand, model, year, code } = req.body;
      await this.registerProductUsecase.execute(
        ProductInputMapper.toOutput({
          id,
          name,
          brand,
          model,
          year,
          code,
        })
      );

      return res.json({ message: 'Done.' }).status(200);
    } catch (error) {
      console.log(error);
      return res.json({ message: 'Serverside err' }).status(500);
    }
  }
}
