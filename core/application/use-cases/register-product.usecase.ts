import {
  IProductInput,
  IProductRepository,
  IUsecase,
} from '../../../shared/index';

export namespace RegisterProductUsecase {
  export type Input = IProductInput;
  export type Output = IProductRepository.RegisterResult;

  export class Usecase implements IUsecase<Input, Output> {
    constructor(private productRepository: IProductRepository.Repository) {}
    async execute(product: Input) {
      return await this.productRepository.register(product);
    }
  }
}
