import SurveyRepository from "../../domain/repository/SurveyRepository";
import Survey from "../../domain/entity/Survey";
import Question from "../../domain/entity/Question";

export default class UpdateSurvey {
  constructor(readonly surveyRepository: SurveyRepository) {}

  async execute(input: Input): Promise<Output | null> {
    const savedSurvey = await this.surveyRepository.get(input.code);
    if (!savedSurvey) return null;

    const questionsToSave = this.updateQuestions(input, savedSurvey);

    const surveyToUpdate = Survey.buildExistingSurvey(
      input.code,
      input.name,
      questionsToSave,
      savedSurvey?.createdAt ?? new Date()
    );

    const survey = await this.surveyRepository.getOneAndUpdate(
      input.code,
      surveyToUpdate
    );
    return survey;
  }

  private updateQuestions(input: Input, savedSurvey: Survey) {
    const newQuestions: Question[] = [];

    input.questions.forEach((question) => {
      if (!question.code) {
        newQuestions.push(new Question(question.statement));
      }

      savedSurvey.questions.forEach((savedQuestion) => {
        if (savedQuestion.code === question.code) {
          savedQuestion.statement = question.statement;
        }
      });
    });

    const questionsToSave = [...savedSurvey.questions, ...newQuestions];

    const withoutDuplicates = questionsToSave.filter(
      (question, index, self) =>
        index ===
        self.findIndex(
          (questionToCompare) =>
            questionToCompare.statement === question.statement
        )
    );
    return withoutDuplicates;
  }
}

type Input = {
  code: string;
  name: string;
  questions: Question[];
};

type Output = Input & { code: string };
