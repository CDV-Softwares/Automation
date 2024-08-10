export default class Product {
  private title: string;
  constructor(
    name: string,
    brand: string,
    model: string,
    year: string,
    code: string
  ) {
    this.title = `${name} ${brand} ${model} ${year} ${code}`;
  }

  getTitle() {
    return this.title;
  }
}
