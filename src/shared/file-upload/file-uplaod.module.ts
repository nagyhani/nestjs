import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
@Module({
  controllers: [FileUploadController],
  providers: [{
      provide: 'CLOUDINARY',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        cloudinary.config({
          cloud_name: configService.get('uploader').cloudName,
          api_key: configService.get('uploader').apiKey,
          api_secret: configService.get('uploader').apiSecret,
        });

        return cloudinary;
      },
    },
    CloudinaryProvider,
    {
      provide: 'FILE_UPLOAD_PROVIDER',
      useExisting: CloudinaryProvider,
    },],
  exports: ['FILE_UPLOAD_PROVIDER'],
})
export class FileUploadModule {}