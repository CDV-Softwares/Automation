import IProduct from '../../../shared/interfaces/IPrroduct';
import IUsercase from '../../../shared/interfaces/IUsercase';
import { ProductRepository } from '../../domain/repositories/product.repository';

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
