import Question from "../../domain/entity/Question";
import QuestionAnswer from "../../domain/entity/QuestionAnswer";
import { SortDirectionEnum } from "../../domain/repository/enum/SortDirectionEnum";
import FileGeneratorRepository from "../../domain/repository/FileGeneratorRepository";
import SurveyRepository from "../../domain/repository/SurveyRepository";

export default class ExportAnswers {
  constructor(
    readonly surveyRepository: SurveyRepository,
    readonly fileGeneratorRepository: FileGeneratorRepository
  ) {}

  async execute(input: Input): Promise<string> {
    const surveyWithAnswers = await this.surveyRepository.getSurveyWithAnswers(
      input.surveyCode,
      input.sort
    );

    const headers = new Set(["Survey Name"]);
    const rows: string[][] = [];

    surveyWithAnswers.map((surveyWithAnswer) => {
      surveyWithAnswer.survey.questions.map((question: Question) =>
        headers.add(question.statement)
      );

      const answers = surveyWithAnswer.answers.map((answer: QuestionAnswer) => {
        return answer.answer;
      });
      const row: string[] = [surveyWithAnswer.survey.name, ...answers];
      rows.push(row);
    });

    return this.fileGeneratorRepository.exportCSV([
      Array.from(headers),
      ...rows,
    ]);
  }
}

type Input = {
  surveyCode: string;
  sort: SortDirectionEnum;
};
