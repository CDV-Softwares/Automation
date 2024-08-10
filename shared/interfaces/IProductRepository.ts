import IProductInput from './IProductInput';

export namespace IProductRepository {
  export type RegisterResult = {
    message: string;
    status: number;
  };

  export interface Repository {
    register(product: IProductInput): Promise<RegisterResult>;
  }
}
