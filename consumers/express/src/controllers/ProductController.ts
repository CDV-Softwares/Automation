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
      const { id, name, brand, model, year, code, price } = req.body;
      const response = await this.registerProductUsecase.execute(
        ProductInputMapper.toOutput({
          id,
          name,
          brand,
          model,
          year,
          code,
          price,
        })
      );

      return res.json({ message: response.message }).status(response.status);
    } catch (error) {
      console.log(error);
      return res.json({ message: 'Serverside err' }).status(500);
    }
  }
}
