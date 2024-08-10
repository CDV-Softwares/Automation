import IProduct from '../../../shared/interfaces/IProduct';

export default class Product implements IProduct {
  constructor(
    public id: string,
    public name: string,
    public brand: string,
    public model: string,
    public year: string,
    public code: string
  ) {}
}
