import { DefaultQuestionsEnum } from "./enum/DefaultQuestionsEnum";
import Question from "./Question";

export default class Survey {
  constructor(
    readonly code: string,
    readonly name: string,
    readonly questions: Question[],
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {
    this.validateQuestions(questions);
    this.generateDefaultQuestions();
  }

  private generateDefaultQuestions(): void {
    const keys = Object.values(DefaultQuestionsEnum);

    keys.forEach((value) => {
      this.questions.unshift(new Question(value));
    });
  }

  private validateQuestions(questions: Question[]): void {
    if (questions.length < 1) {
      throw new Error("At least one question is required");
    }
  }

  static create(code: string, name: string, questions: Question[]): Survey {
    return new Survey(code, name, questions, new Date(), new Date());
  }

  static buildExistingSurvey(
    code: string,
    name: string,
    questions: Question[],
    createdAt: Date
  ): Survey {
    return new Survey(code, name, questions, createdAt, new Date());
  }
}
