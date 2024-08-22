import IProduct from '../../interfaces/IProduct';

export class ProductProps {
  static generate(
    props: IProduct = {
      id: '1234',
      name: 'Produto X',
      brand: 'Ford',
      model: 'Fiesta',
      price: '199',
      code: '123234345456',
      year: '1994',
    }
  ): IProduct {
    return props;
  }
}
