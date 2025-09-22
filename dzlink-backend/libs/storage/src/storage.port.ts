export abstract class StoragePort {
  abstract uploadFile(params: {
    buffer: Buffer;
    originalName: string;
    mimetype: string;
    folder?: string;
  }): Promise<string>;

  abstract deleteFile(key: string): Promise<void>;
}

export const STORAGE_PORT = 'STORAGE_PORT';
