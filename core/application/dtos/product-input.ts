import {
  EmptyFieldException,
  TitleTooLongException,
} from '../../../exceptions';
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
      props.code,
      props.price
    );
    this.capitalizeAndRemoveSpace();
    this.title = `${this.name} ${this.brand} ${this.model} ${this.year} ${this.code}`;
    this.validateFields();
  }

  private validateFields() {
    if (this.title.length > 60) throw new TitleTooLongException();
    const classFields = Object.keys(this) as (keyof ProductInput)[];
    classFields.forEach((field) => {
      if (!this[field].length) throw new EmptyFieldException(field);
    });
  }

  private capitalizeAndRemoveSpace() {
    this.capitalizeNameFields();
    this.removeSpaceFromEveryField();
  }

  private capitalizeNameFields() {
    const slice = (str: string) =>
      str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
    this.brand = slice(this.brand);
    this.model = slice(this.model);
  }

  private removeSpaceFromEveryField() {
    this.id = this.id.trim();
    this.name = this.name.trim();
    this.brand = this.brand.trim();
    this.model = this.model.trim();
    this.year = this.year.trim();
    this.code = this.code.trim();
    this.price = this.price.trim();
  }
}

export class ProductInputMapper {
  static toOutput(entity: Product): IProductInput {
    return new ProductInput(entity);
  }
}
