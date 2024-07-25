export default class Question {
  code?: string;
  statement: string;

  constructor(statement: string) {
    this.code = crypto.randomUUID();
    this.statement = statement;
  }
}
