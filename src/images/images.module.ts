import Constants from '@App/constants';
import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { S3Client } from '@aws-sdk/client-s3';
import { ImagesController } from './images.controller';

@Module({
  imports: [],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    {
      provide: S3Client,
      useFactory: () =>
        new S3Client({
          region: 'auto',
          endpoint: Constants.r2Endpoint,
          credentials: {
            accessKeyId: Constants.r2AccessKeyId,
            secretAccessKey: Constants.r2AccessKeySecret,
          },
        }),
    },
  ],
})
export class ImagesModule {}
