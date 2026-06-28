import { Injectable, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { FileUploadProvider } from './upload.provider.interface';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class CloudinaryProvider implements FileUploadProvider {

    constructor(private readonly configService:ConfigService){}
  async upload(
    file: Express.Multer.File,
   userId:Types.ObjectId,
  ): Promise<{
    url: string;
    publicId: string;
  }> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder:`${this.configService.get('uploader').appName}/users/${userId}`,
          
        },
        (error, result) => {
          if (error) return reject(error);

          resolve({
            url: result!.secure_url,
            publicId: result!.public_id,
          });
        },
      );

       upload.end(file.buffer)
    });
  }

  async delete(publicId: string): Promise<void> {
    
    const ExistImage = await cloudinary.url(publicId, {
      secure: true,
    });

    if(!ExistImage) throw new NotFoundException('Image Not Found')

        console.log(ExistImage);
        

    await cloudinary.uploader.destroy(publicId);
  }
 async getFile(publicId: string): Promise<string> {

      const ExistImage = await cloudinary.url(publicId, {
      secure: true,
    });

    if(!ExistImage) throw new NotFoundException('Image Not Found')
    return ExistImage
  }
}
