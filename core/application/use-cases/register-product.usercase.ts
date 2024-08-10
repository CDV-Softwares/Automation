import IProduct from '../../../shared/interfaces/IProduct';
import IUsercase from '../../../shared/interfaces/IUsecase';
import { ProductRepository } from '../../../shared/interfaces/product.repository';

export namespace RegisterProductUsercase {
  export type Input = IProduct;
  export type Output = ProductRepository.RegisterResult;

  export class Usecase implements IUsercase<Input, Output> {
    constructor(private productRepository: ProductRepository.Repository) {}
    async execute(product: IProduct) {
      return await this.productRepository.register(product);
    }
  }
}
