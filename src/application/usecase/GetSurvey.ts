import Question from "../../domain/entity/Question";
import SurveyRepository from "../../domain/repository/SurveyRepository";

export default class GetSurvey {
  constructor(readonly surveyRepository: SurveyRepository) {}

  async execute(code: string): Promise<Output | null> {
    const survey = await this.surveyRepository.get(code);
    return survey;
  }
}

type Output = {
  code: string;
  name: string;
  targetAudience: string;
  stars: number;
  customerEmail: string;
  questions: Question[];
};
