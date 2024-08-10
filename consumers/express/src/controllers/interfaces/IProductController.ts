import { Request, Response } from 'express';
import { IProductService } from 'shared';

export default interface IProductController {
  register(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>>;
}
