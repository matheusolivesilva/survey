import Answer from "../entity/Answer";
import Survey from "../entity/Survey";
import { SortDirection } from "./enum/SortDirection";

export default interface SurveyRepository {
  save(survey: Survey): Promise<Survey>;
  saveAnswer(answer: Answer): Promise<Answer>;
  getOneAndUpdate(code: string, survey: Survey): Promise<Survey | null>;
  get(code: string): Promise<Survey | null>;
  getFilledAnswersByAudience(
    audience: string,
    sort: SortDirection
  ): Promise<any[]>;
}
