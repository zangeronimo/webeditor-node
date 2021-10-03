export default interface IStorageProvider {
  saveFile(file: string, company: string): Promise<string>;
  deleteFile(file: string, company: string): Promise<void>;
}
