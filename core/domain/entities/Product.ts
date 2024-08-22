import { IProduct } from '../../../shared/index';

export default class Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: string;
  code: string;
  price: string;

  constructor(props: IProduct) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.model = props.model;
    this.year = props.year;
    this.code = props.code;
    this.price = props.price;
  }
}
