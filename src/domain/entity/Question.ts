export default class Question {
  code?: string;

  constructor(readonly statement: string) {
    this.code = crypto.randomUUID();
  }
}
