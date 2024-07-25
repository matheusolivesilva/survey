import Survey from "../../domain/entity/Survey";
import SurveyRepository from "../../domain/repository/SurveyRepository";

export default class SurveyMemoryRepository implements SurveyRepository {
  survey: Survey[];

  constructor() {
    this.survey = [];
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
