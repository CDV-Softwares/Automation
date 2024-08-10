import { IProductInput } from '../../../shared/interfaces/IProductInput';
import IUsercase from '../../../shared/interfaces/IUsecase';
import { ProductRepository } from '../../../shared/interfaces/product.repository';

export namespace RegisterProductUsercase {
  export type Input = IProductInput;
  export type Output = ProductRepository.RegisterResult;

  export class Usecase implements IUsercase<Input, Output> {
    constructor(private productRepository: ProductRepository.Repository) {}
    async execute(product: Input) {
      return await this.productRepository.register(product);
    }
  }
}
