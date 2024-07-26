import { writeFileSync } from "fs";
import Connection from "../database/Connection";
import FileGeneratorRepository from "../../domain/repository/FileGeneratorRepository";

export default class GeneratorOfFileRepository
  implements FileGeneratorRepository
{
  constructor(readonly connection: Connection) {}

  exportCSV(data: string[][]): string {
    const rows = data.map((row) => `"${row.join('", "')}"`);
    const csv = rows.join("\n");
    const filename = `exported/${new Date().getTime()}.csv`;
    try {
      writeFileSync(filename, csv);
      return filename;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
