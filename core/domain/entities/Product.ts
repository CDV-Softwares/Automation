import IProduct from '../../../shared/interfaces/IProduct';

export default class Product implements IProduct {
  constructor(private props: IProduct) {}
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
