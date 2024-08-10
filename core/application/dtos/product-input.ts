import { IProduct, IProductInput } from '../../../shared/index';
import { Product } from '../../domain/index';

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
