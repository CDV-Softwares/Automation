import IProduct from './IProduct';

export namespace ProductRepository {
  export type RegisterResult = {
    message: string;
    status: boolean;
  };

  export interface Repository {
    register(product: IProduct): Promise<RegisterResult>;
  }
}
