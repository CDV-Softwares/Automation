import {
  IProductInput,
  IProductService,
  IUsecase,
} from '../../../shared/index';

export namespace FourthStepUsecase {
  export type Input = IProductInput;
  export type Output = IProductService.RegisterResult;

  export class Usecase implements IUsecase<Input, Output> {
    constructor(private productService: IProductService.Service) {}
    async execute(product: Input): Promise<Output> {
      const res = await this.productService.fourthStep(product);
      return res;
    }
  }
}
