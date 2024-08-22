import { ProductProps } from '../../../../shared/tests/entities/ProductProps';
import Product from '../Product';

describe('Product Entity unit test', () => {
  it('should have all the props', () => {
    const entity = new Product(ProductProps.generate());
    expect(entity.brand).toBeDefined();
    expect(entity.code).toBeDefined();
    expect(entity.id).toBeDefined();
    expect(entity.model).toBeDefined();
    expect(entity.name).toBeDefined();
    expect(entity.price).toBeDefined();
    expect(entity.year).toBeDefined();

    expect(entity.id).toBe('1234');
    expect(entity.name).toBe('Produto X');
    expect(entity.brand).toBe('Ford');
    expect(entity.model).toBe('Fiesta');
    expect(entity.price).toBe('199');
    expect(entity.code).toBe('123234345456');
    expect(entity.year).toBe('1994');
  });
});
