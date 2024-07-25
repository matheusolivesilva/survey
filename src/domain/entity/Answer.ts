export default class Answer {
  constructor(
    readonly code: string,
    readonly surveyCode: string,
    readonly questionCode: string,
    readonly answer: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {
    this.validateAnswer(answer);
    // this.validateTargetAudience(targetAudience);
    // this.validateStars(stars);
    // this.validateCustomerEmail(customerEmail);
  }

  private validateAnswer(answer: string): void {
    if (answer.length === 0) {
      throw new Error("Answer must be filled");
    }
  }

  // private validateTargetAudience(targetAudience: string): void {
  //   if (targetAudience.length === 0) {
  //     throw new Error("Target audience must be filled");
  //   }
  // }

  // private validateStars(stars: number): void {
  //   if (stars < 0 || stars > 5) {
  //     throw new Error("Stars must be between 0 and 5");
  //   }
  // }

  // private validateCustomerEmail(customerEmail: string): void {
  //   const emailPattern = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  //   if (this.customerEmail.toLowerCase().match(emailPattern)) return;
  //   throw new Error("Invalid email");
  // }
}
