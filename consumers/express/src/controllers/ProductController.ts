import { Request, Response } from 'express';
import { IProductService } from 'shared';
import IProductController from './interfaces/IProductController';
import {
  ProductInputMapper,
  FirstStepUsecase,
  SecondStepUsecase,
  ThirdStepUsecase,
  FourthStepUsecase,
} from 'application';

export default class ProductController implements IProductController {
  constructor(
    private firstStepUseCase: FirstStepUsecase.Usecase,
    private secondStepUseCase: SecondStepUsecase.Usecase,
    private thirdStepUseCase: ThirdStepUsecase.Usecase,
    private fourthStepUseCase: FourthStepUsecase.Usecase
  ) {}

  async firstStep(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>> {
    try {
      const { id, name, brand, model, year, code, price } = req.body;
      const response = await this.firstStepUseCase.execute(
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
      return res.status(500).json({
        message: error instanceof Error ? error.message : 'Serverside err',
      });
    }
  }

  async secondStep(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>> {
    try {
      const { id, name, brand, model, year, code, price } = req.body;
      const response = await this.secondStepUseCase.execute(
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
      return res
        .json({
          message: error instanceof Error ? error.message : 'Serverside err',
        })
        .status(500);
    }
  }

  async thirdStep(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>> {
    try {
      const { id, name, brand, model, year, code, price } = req.body;
      const response = await this.thirdStepUseCase.execute(
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
      return res
        .json({
          message: error instanceof Error ? error.message : 'Serverside err',
        })
        .status(500);
    }
  }
  async fourthStep(
    req: Request,
    res: Response
  ): Promise<Response<IProductService.RegisterResult>> {
    try {
      const { id, name, brand, model, year, code, price } = req.body;
      const response = await this.fourthStepUseCase.execute(
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
      return res
        .json({
          message: error instanceof Error ? error.message : 'Serverside err',
        })
        .status(500);
    }
  }
}
