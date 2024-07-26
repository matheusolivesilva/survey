import Answer from "../../domain/entity/Answer";
import Survey from "../../domain/entity/Survey";
import { SortDirectionEnum } from "../../domain/repository/enum/SortDirectionEnum";
import SurveyRepository from "../../domain/repository/SurveyRepository";
import Connection from "../database/Connection";
import { AnswerSchema } from "../database/mongoose/models/Answer";
import { SurveySchema } from "../database/mongoose/models/Survey";

export default class SurveyDatabaseRepository implements SurveyRepository {
  constructor(readonly connection: Connection) {}

  getFilledAnswersByAudience(
    targetAudience: string,
    sort: SortDirectionEnum
  ): Promise<Answer[]> {
    return AnswerSchema.find({ targetAudience }).sort({
      stars: sort === SortDirectionEnum.ASCENDING ? 1 : -1,
    });
  }

  saveAnswer(answer: Answer): Promise<Answer> {
    return AnswerSchema.create(answer);
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
