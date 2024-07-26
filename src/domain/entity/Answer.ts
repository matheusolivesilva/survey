export default class Answer {
  code?: string;
  surveyCode: string;

  constructor(
    readonly questionCode: string,
    readonly answer: string,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date()
  ) {
    this.validateAnswer(answer);
    this.surveyCode = "";
  }

  private validateAnswer(answer: string): void {
    if (answer.length === 0) {
      throw new Error("Answer must be filled");
    }
  }

  setSurveyCode(surveyCode: string): void {
    this.surveyCode = surveyCode;
  }

  generateCode(): void {
    this.code = crypto.randomUUID();
  }
}
