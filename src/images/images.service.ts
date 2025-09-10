import Constants from '@App/constants';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagesService {
  constructor(private readonly client: S3Client) {}

  async uploadImage(image: Express.Multer.File, category?: string) {
    const id = uuidv4();
    const extension = this.getExtension(image.originalname);
    const filename = this.getFilename(category, id, extension);

    const key = category ? `${category}/${filename}` : filename;

    const command = new PutObjectCommand({
      Bucket: 'xpf',
      Key: key,
      Body: image.buffer,
    });

    await this.client.send(command);

    return {
      location: `${Constants.r2ReadEndpoint}/${key}`,
    };
  }

  private getFilename(category: string, id: string, extension: string) {
    return [category ? `${category}_` : '', id, '.', extension].join('');
  }

  private getExtension(filename: string) {
    const filenameSplit = filename.split('.');
    const lastIndex = filenameSplit.length - 1;

    return filenameSplit[lastIndex];
  }
}
