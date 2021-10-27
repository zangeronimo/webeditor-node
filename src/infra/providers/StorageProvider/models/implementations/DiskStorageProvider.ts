import fs from 'fs';
import path from 'path';
import IStorageProvider from '../IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string, company: string): Promise<string> {
    if (!file) {
      return "";
    }

    const [header,base64Data] = file.split(',');
    const [,type] = header.replace(';base64', '').split('/');
    const name = `${new Date().getTime()}.${type}`;
    const dir = path.resolve('upload', company);

    this.createDir(dir);
    fs.writeFile(`${dir}/${name}`, base64Data, 'base64', (err) => console.log(err));

    return `/files/${company}/${name}`;
  }

  private createDir(dir: string) {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  public async deleteFile(file: string): Promise<void> {
    const removeFile = file.replace('/files/', 'upload/');
    const dir = path.resolve(removeFile);

    try {
      await fs.promises.stat(dir);
    } catch {
      return;
    }

    await fs.promises.unlink(dir);
  }
}
