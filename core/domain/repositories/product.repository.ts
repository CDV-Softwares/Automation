import IProduct from '../../../shared/interfaces/IPrroduct';

export namespace ProductRepository {
  export type RegisterResult = {
    message: string;
    status: boolean;
  };

  export interface Repository {
    register(product: IProduct): Promise<RegisterResult>;
  }
}
