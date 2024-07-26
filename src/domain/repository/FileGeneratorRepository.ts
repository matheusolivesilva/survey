export default interface FileGeneratorRepository {
  exportCSV(data: string[][]): string;
}
