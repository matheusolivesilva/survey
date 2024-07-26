import FileGeneratorRepository from "../../domain/repository/FileGeneratorRepository";
import Connection from "../database/Connection";
import FileGeneratorMemoryRepository from "./FileGeneratorMemoryRepository";
import GeneratorOfFileRepository from "./GeneratorOfFileRepository";

export default class FileGeneratorRepositoryFactory {
  constructor(readonly connection: Connection) {}

  create(): FileGeneratorRepository {
    return process.env.IS_TESTING === "true"
      ? new FileGeneratorMemoryRepository()
      : new GeneratorOfFileRepository(this.connection);
  }
}
