import { Request, Response } from 'express';
import { IProductService } from 'shared';
import IProductController from './interfaces/IProductController';
import { ProductInputMapper, RegisterProductUsecase } from 'application';

export default class ProductController implements IProductController {
  constructor(private registerProductUsecase: RegisterProductUsecase.Usecase) {}
  async register(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>> {
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
