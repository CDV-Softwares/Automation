import { Request, Response } from 'express';
import { IProductService } from 'shared';

export default interface IProductController {
  firstStep(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>>;
  secondStep(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>>;
  thirdStep(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>>;
  fourthStep(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>>;
}
