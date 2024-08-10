export default interface IUsercase<Input, Output> {
  execute(input: Input): Promise<Output> | Output;
}
