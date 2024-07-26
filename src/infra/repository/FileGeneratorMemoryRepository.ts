import FileGeneratorRepository from "../../domain/repository/FileGeneratorRepository";

export default class FileGeneratorMemoryRepository
  implements FileGeneratorRepository
{
  exportCSV(data: string[][]): string {
    throw new Error("Method not implemented.");
  }
}
