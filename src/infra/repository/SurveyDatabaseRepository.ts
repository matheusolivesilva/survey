import Answer from "../../domain/entity/Answer";
import Survey from "../../domain/entity/Survey";
import SurveyRepository from "../../domain/repository/SurveyRepository";
import Connection from "../database/Connection";
import { AnswerSchema } from "../database/mongoose/models/Answer";
import { SurveySchema } from "../database/mongoose/models/Survey";

export default class SurveyDatabaseRepository implements SurveyRepository {
  constructor(readonly connection: Connection) {}

  saveAnswers(answers: Answer[]): Promise<Answer[]> {
    return AnswerSchema.insertMany(answers);
  }

  async save(survey: Survey): Promise<Survey> {
    return SurveySchema.create(survey);
  }

  async get(code: string): Promise<Survey | null> {
    return SurveySchema.findOne({ code });
  }

  async getOneAndUpdate(code: string, survey: Survey): Promise<Survey | null> {
    return SurveySchema.findOneAndUpdate({ code }, survey, { new: true });
  }
}
