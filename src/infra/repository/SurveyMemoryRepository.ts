import Answer from "../../domain/entity/Answer";
import Survey from "../../domain/entity/Survey";
import { SortDirection } from "../../domain/repository/enum/SortDirection";
import SurveyRepository from "../../domain/repository/SurveyRepository";

export default class SurveyMemoryRepository implements SurveyRepository {
  survey: Survey[];
  answer: Answer = {} as Answer;

  constructor() {
    this.survey = [];
  }

  getFilledAnswersByAudience(
    audience: string,
    sort: SortDirection
  ): Promise<Answer[]> {
    throw new Error("Method not implemented.");
  }

  async saveAnswer(answer: Answer): Promise<Answer> {
    this.answer = answer;
    return answer;
  }

  getOneAndUpdate(code: string, data: Survey): Promise<Survey | null> {
    const existingSurvey = this.survey.find((survey) => survey.code === code);
    if (!existingSurvey) return null as any;

    let updatedSurvey: Survey = {} as Survey;
    this.survey = this.survey.map((surveyToFind) => {
      if (surveyToFind.code === code) {
        updatedSurvey = {
          ...surveyToFind,
          ...data,
        } as Survey;

        return updatedSurvey;
      }
      return surveyToFind;
    });

    return updatedSurvey as any;
  }

  async save(survey: Survey): Promise<Survey> {
    this.survey.push(survey);
    return survey;
  }

  async get(code: string): Promise<Survey> {
    const survey = this.survey.find((survey) => survey.code === code);
    if (!survey) throw new Error();
    return survey;
  }
}
