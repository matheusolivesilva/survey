import Survey from "../../domain/entity/Survey";
import SurveyRepository from "../../domain/repository/SurveyRepository";
import Connection from "../database/Connection";
import { SurveySchema } from "../database/mongoose/models/Survey";

export default class SurveyDatabaseRepository implements SurveyRepository {
  constructor(readonly connection: Connection) {}

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
