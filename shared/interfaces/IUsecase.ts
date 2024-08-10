export default interface IUsecase<Input, Output> {
  execute(
    product: Input,
    url: string,
    login: string,
    password: string
  ): Promise<Output> | Output;
}
