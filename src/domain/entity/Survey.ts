import Question from "./Question";

export default class Survey {
  constructor(
    readonly code: string,
    readonly name: string,
    readonly targetAudience: string,
    readonly stars: number,
    readonly customerEmail: string,
    readonly questions: Question[],
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {
    this.validateTargetAudience(targetAudience);
    this.validateStars(stars);
    this.validateCustomerEmail(customerEmail);
    this.validateQuestions(questions);
  }

  private validateTargetAudience(targetAudience: string): void {
    if (targetAudience.length === 0) {
      throw new Error("Target audience must be filled");
    }
  }

  private validateStars(stars: number): void {
    if (stars < 0 || stars > 5) {
      throw new Error("Stars must be between 0 and 5");
    }
  }

  private validateCustomerEmail(customerEmail: string): void {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (this.customerEmail.toLowerCase().match(emailPattern)) return;
    throw new Error("Invalid email");
  }

  private validateQuestions(questions: Question[]): void {
    if (questions.length < 1) {
      throw new Error("At least one question is required");
    }
  }

  static create(
    code: string,
    name: string,
    targetAudience: string,
    stars: number,
    customerEmail: string,
    questions: Question[]
  ): Survey {
    return new Survey(
      code,
      name,
      targetAudience,
      stars,
      customerEmail,
      questions,
      new Date(),
      new Date()
    );
  }

  static buildExistingSurvey(
    code: string,
    name: string,
    targetAudience: string,
    stars: number,
    customerEmail: string,
    questions: Question[],
    createdAt: Date
  ): Survey {
    return new Survey(
      code,
      name,
      targetAudience,
      stars,
      customerEmail,
      questions,
      createdAt,
      new Date()
    );
  }
}
