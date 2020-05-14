import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push('file');
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(index => index === file);

    if (findIndex > -1) {
      this.storage.splice(findIndex, 1);
    }
  }
}
