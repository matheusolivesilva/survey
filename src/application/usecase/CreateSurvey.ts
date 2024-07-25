import SurveyRepository from "../../domain/repository/SurveyRepository";
import Survey from "../../domain/entity/Survey";
import Question from "../../domain/entity/Question";

export default class CreateSurvey {
  constructor(readonly surveyRepository: SurveyRepository) {}

  async execute(input: Input): Promise<Output> {
    const code = crypto.randomUUID();
    const questions = input.questions.map(
      (question) => new Question(question.statement)
    );
    const survey = Survey.create(code, input.name, questions);
    return this.surveyRepository.save(survey);
  }
}

type Input = {
  name: string;
  questions: Question[];
};

type Output = Input & { code: string };
