import Answer from "../entity/Answer";
import Survey from "../entity/Survey";
import { SortDirectionEnum } from "./enum/SortDirectionEnum";

export default interface SurveyRepository {
  save(survey: Survey): Promise<Survey>;
  saveAnswer(answer: Answer): Promise<Answer>;
  getOneAndUpdate(code: string, survey: Survey): Promise<Survey | null>;
  get(code: string): Promise<Survey | null>;
  getFilledAnswersByAudience(
    targetAudience: string,
    sort: SortDirectionEnum
  ): Promise<Answer[]>;
  getSurveyWithAnswers(
    surveyCode: string,
    sort: SortDirectionEnum
  ): Promise<any[]>;
}
