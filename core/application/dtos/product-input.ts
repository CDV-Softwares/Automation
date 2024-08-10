import IProduct from '../../../shared/interfaces/IProduct';
import { IProductInput } from '../../../shared/interfaces/IProductInput';

export class ProductInputMapper {
  static toOutput(entity: IProduct): IProductInput {
    return {
      ...entity,
      title: `${entity.name} ${entity.brand} ${entity.model} ${entity.year} ${entity.code}`,
    };
  }
}
