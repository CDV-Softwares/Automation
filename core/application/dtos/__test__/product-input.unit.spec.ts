import { EmptyFieldException } from '../../../../exceptions';
import { ProductProps } from '../../../../shared/tests/entities/ProductProps';
import { ProductInput, ProductInputMapper } from '../product-input';

describe('product-input unit tests', () => {
  describe('ProductInput class', () => {
    it('should have all the props', () => {
      const productInput = new ProductInput(ProductProps.generate());

      expect(productInput.brand).toBeDefined();
      expect(productInput.code).toBeDefined();
      expect(productInput.id).toBeDefined();
      expect(productInput.model).toBeDefined();
      expect(productInput.name).toBeDefined();
      expect(productInput.price).toBeDefined();
      expect(productInput.year).toBeDefined();

      expect(productInput.id).toBe('1234');
      expect(productInput.name).toBe('Produto X');
      expect(productInput.brand).toBe('Ford');
      expect(productInput.model).toBe('Fiesta');
      expect(productInput.price).toBe('199');
      expect(productInput.code).toBe('123234345456');
      expect(productInput.year).toBe('1994');
    });

    test('validateFields method should validate', () => {
      expect(
        () =>
          new ProductInput(
            ProductProps.generate({
              id: ' 1234 ',
              name: ' ',
              brand: ' ford ',
              model: ' fiesta ',
              price: ' 199 ',
              code: ' 123234345456 ',
              year: ' 1994 ',
            })
          )
      ).toThrow(new EmptyFieldException('name'));

      expect(
        () =>
          new ProductInput(
            ProductProps.generate({
              id: '1234 ',
              name: ' Produto X ',
              brand: '  ',
              model: ' fiesta ',
              price: ' 199 ',
              code: ' 123234345456 ',
              year: ' 1994 ',
            })
          )
      ).toThrow(new EmptyFieldException('brand'));

      expect(
        () =>
          new ProductInput(
            ProductProps.generate({
              id: ' 1234 ',
              name: ' Produto X ',
              brand: ' ford ',
              model: '  ',
              price: ' 199 ',
              code: ' 123234345456 ',
              year: ' 1994 ',
            })
          )
      ).toThrow(new EmptyFieldException('model'));

      expect(
        () =>
          new ProductInput(
            ProductProps.generate({
              id: ' 1234 ',
              name: ' Produto X ',
              brand: ' ford ',
              model: ' fiesta ',
              price: '  ',
              code: ' 123234345456 ',
              year: ' 1994 ',
            })
          )
      ).toThrow(new EmptyFieldException('price'));

      expect(
        () =>
          new ProductInput(
            ProductProps.generate({
              id: ' 1234 ',
              name: ' Produto X ',
              brand: ' ford ',
              model: ' fiesta ',
              price: ' 199 ',
              code: '  ',
              year: ' 1994 ',
            })
          )
      ).toThrow(new EmptyFieldException('code'));

      expect(
        () =>
          new ProductInput(
            ProductProps.generate({
              id: ' 1234 ',
              name: ' Produto X ',
              brand: ' ford ',
              model: ' fiesta ',
              price: ' 199 ',
              code: ' 123234345456 ',
              year: '  ',
            })
          )
      ).toThrow(new EmptyFieldException('year'));
    });

    test('capitalizeAndRemoveSpace method should remove white space and capitalize brand and model fields', () => {
      const productInput = new ProductInput(
        ProductProps.generate({
          id: ' 1234 ',
          name: ' Produto X ',
          brand: ' ford ',
          model: ' fiesta ',
          price: ' 199 ',
          code: ' 123234345456 ',
          year: ' 1994 ',
        })
      );

      expect(productInput.brand).toBeDefined();
      expect(productInput.code).toBeDefined();
      expect(productInput.id).toBeDefined();
      expect(productInput.model).toBeDefined();
      expect(productInput.name).toBeDefined();
      expect(productInput.price).toBeDefined();
      expect(productInput.year).toBeDefined();

      expect(productInput.id).toBe('1234');
      expect(productInput.name).toBe('Produto X');
      expect(productInput.brand).toBe('Ford');
      expect(productInput.model).toBe('Fiesta');
      expect(productInput.price).toBe('199');
      expect(productInput.code).toBe('123234345456');
      expect(productInput.year).toBe('1994');
    });

    test('title should be defined', () => {
      const productInput = new ProductInput(ProductProps.generate());
      expect(productInput.title).toBe(
        'Produto X Ford Fiesta 1994 123234345456'
      );
    });
  });

  describe('ProductInputMapper class', () => {
    test('toOutput method should return IProductInput', () => {
      const productInputMapper = ProductInputMapper.toOutput(
        new ProductInput(ProductProps.generate())
      );
      expect(productInputMapper).toBeInstanceOf(ProductInput);
    });
  });
});
