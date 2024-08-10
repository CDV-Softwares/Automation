import IProduct from '../../../shared/interfaces/IPrroduct';

export default class Product {
  private title: string;
  constructor(private props: IProduct) {
    this.title = `${props.name} ${props.brand} ${props.model} ${props.year} ${props.code}`;
  }

  getTitle() {
    return this.title;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get brand() {
    return this.props.brand;
  }

  get model() {
    return this.props.model;
  }

  get year() {
    return this.props.year;
  }

  get code() {
    return this.props.code;
  }
}
