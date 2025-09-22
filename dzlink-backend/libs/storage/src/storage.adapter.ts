// libs/storage/src/local-storage.adapter.ts
import { Injectable } from '@nestjs/common';
import { StoragePort } from './storage.port';
import { promises as fs } from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LocalStorageAdapter extends StoragePort {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    super();
  }

  async uploadFile({
    buffer,
    originalName,
    folder = 'images',
  }: {
    buffer: Buffer;
    originalName: string;
    mimetype: string;
    folder?: string;
  }): Promise<string> {
    // Ensure directory exists
    const targetDir = path.join(this.uploadDir, folder);
    await fs.mkdir(targetDir, { recursive: true });

    // Create unique file name
    const fileName = `${uuid()}-${originalName}`;
    const filePath = path.join(targetDir, fileName);

    // Save file
    await fs.writeFile(filePath, buffer);

    // Return public URL (served by Nest with `useStaticAssets`)
    return `/uploads/${folder}/${fileName}`;
  }

  async deleteFile(key: string): Promise<void> {
    const filePath = path.join(this.uploadDir, key.replace('/uploads/', ''));
    try {
      await fs.unlink(filePath);
    } catch {
      // ignore if file doesn’t exist
    }
  }
}
