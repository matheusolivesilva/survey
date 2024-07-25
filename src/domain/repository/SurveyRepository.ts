import Survey from "../entity/Survey";

export default interface SurveyRepository {
  save(survey: Survey): Promise<Survey>;
  get(code: string): Promise<Survey | null>;
}
