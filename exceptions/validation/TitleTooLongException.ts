export default class TitleTooLongException extends Error {
  constructor(public message: string = 'Title exceed 60 caracters') {
    super(message);
  }
}
