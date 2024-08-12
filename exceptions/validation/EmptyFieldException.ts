export default class EmptyFieldException extends Error {
  public message: string;
  constructor(public fieldName: string) {
    const err = `The field: ${fieldName} is empty.`;
    super(err);
    this.message = err;
  }
}
