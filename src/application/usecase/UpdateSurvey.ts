import SurveyRepository from "../../domain/repository/SurveyRepository";
import Survey from "../../domain/entity/Survey";
import Question from "../../domain/entity/Question";

export default class UpdateSurvey {
  constructor(readonly surveyRepository: SurveyRepository) {}

  async execute(input: Input): Promise<Output | null> {
    const savedSurvey = await this.surveyRepository.get(input.code);
    if (!savedSurvey) return null;

    const questions = input.questions.map(
      (question) => new Question(question.statement)
    );

    const surveyToUpdate = Survey.buildExistingSurvey(
      input.code,
      input.name,
      questions,
      savedSurvey?.createdAt ?? new Date()
    );

    const survey = await this.surveyRepository.getOneAndUpdate(
      input.code,
      surveyToUpdate
    );

    return survey;
  }
}

type Input = {
  code: string;
  name: string;
  questions: Question[];
};

type Output = Input & { code: string };
