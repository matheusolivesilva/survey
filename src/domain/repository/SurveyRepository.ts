import Survey from "../entity/Survey";

export default interface SurveyRepository {
  save(survey: Survey): Promise<Survey>;
  getOneAndUpdate(code: string, survey: Survey): Promise<Survey | null>;
  get(code: string): Promise<Survey | null>;
}
