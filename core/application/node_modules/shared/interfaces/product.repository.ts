import { IProductInput } from './IProductInput';

export namespace ProductRepository {
  export type RegisterResult = {
    message: string;
    status: boolean;
  };

  export interface Repository {
    register(product: IProductInput): Promise<RegisterResult>;
  }
}
