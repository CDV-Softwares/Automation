export default interface IUsecase<Input, Output> {
  execute(product: Input): Promise<Output> | Output;
}
