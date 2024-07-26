import QuestionAnswer from "./QuestionAnswer";

export default class Answer {
  code?: string;
  surveyCode: string;

  constructor(
    readonly targetAudience: string,
    readonly customerEmail: string,
    readonly stars: number,
    readonly answers: QuestionAnswer[],
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date()
  ) {
    this.validateAnswers(answers);
    this.surveyCode = "";
  }

  private validateAnswers(answers: QuestionAnswer[]): void {
    if (answers.length === 0) throw new Error("Answer must be filled");
  }

  setSurveyCode(surveyCode: string): void {
    this.surveyCode = surveyCode;
  }

  generateCode(): void {
    this.code = crypto.randomUUID();
  }
}
