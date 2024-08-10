import IProduct from '../../../shared/interfaces/IProduct';
import { IProductInput } from '../../../shared/interfaces/IProductInput';
import { Product } from '../../domain';

class ProductInput extends Product implements IProductInput {
  public title: string;
  constructor(props: IProduct) {
    super(
      props.id,
      props.name,
      props.brand,
      props.model,
      props.year,
      props.code
    );
    this.title = `${this.name} ${this.brand} ${this.model} ${this.year} ${this.code}`;
  }
}

export class ProductInputMapper {
  static toOutput(entity: Product): IProductInput {
    return new ProductInput(entity);
  }
}
