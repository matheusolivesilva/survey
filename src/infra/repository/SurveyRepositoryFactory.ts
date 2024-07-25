import SurveyRepository from "../../domain/repository/SurveyRepository";
import Connection from "../database/Connection";
import SurveyDatabaseRepository from "./SurveyDatabaseRepository";
import SurveyMemoryRepository from "./SurveyMemoryRepository";

export default class SurveyRepositoryFactory {
  constructor(readonly connection: Connection) {}

  create(): SurveyRepository {
    return process.env.IS_TESTING === "true"
      ? new SurveyMemoryRepository()
      : new SurveyDatabaseRepository(this.connection);
  }
}
