import SurveyRepository from "../../domain/repository/SurveyRepository";
import Survey from "../../domain/entity/Survey";
import Question from "../../domain/entity/Question";

export default class CreateSurvey {
  constructor(readonly transactionRepository: SurveyRepository) {}

  async execute(input: Input): Promise<Output> {
    const code = crypto.randomUUID();
    const survey = Survey.create(
      code,
      input.name,
      input.targetAudience,
      input.stars,
      input.customerEmail,
      input.questions
    );
    return this.transactionRepository.save(survey);
  }
}

type Input = {
  name: string;
  targetAudience: string;
  stars: number;
  customerEmail: string;
  questions: Question[];
};

type Output = Input & { code: string };
