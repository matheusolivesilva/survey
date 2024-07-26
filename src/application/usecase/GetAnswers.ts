import Answer from "../../domain/entity/Answer";
import { SortDirectionEnum } from "../../domain/repository/enum/SortDirectionEnum";
import SurveyRepository from "../../domain/repository/SurveyRepository";

export default class GetAnswers {
  constructor(readonly surveyRepository: SurveyRepository) {}

  async execute(input: Input): Promise<Output> {
    const answers = await this.surveyRepository.getFilledAnswersByAudience(
      input.audience,
      input.sort
    );
    return answers;
  }
}

type Input = {
  audience: string;
  sort: SortDirectionEnum;
};

type Output = Answer[];
