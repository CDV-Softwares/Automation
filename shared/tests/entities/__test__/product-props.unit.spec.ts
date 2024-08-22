import { ProductProps } from '../ProductProps';

describe('product props unit tests', () => {
  it('should define product props defined', () => {
    const props = ProductProps.generate();
    expect(props.brand).toBeDefined();
    expect(props.code).toBeDefined();
    expect(props.id).toBeDefined();
    expect(props.model).toBeDefined();
    expect(props.name).toBeDefined();
    expect(props.price).toBeDefined();
    expect(props.year).toBeDefined();

    expect(props.id).toBe('1234');
    expect(props.name).toBe('Produto X');
    expect(props.brand).toBe('Ford');
    expect(props.model).toBe('Fiesta');
    expect(props.price).toBe('199');
    expect(props.code).toBe('123234345456');
    expect(props.year).toBe('1994');
  });
});
