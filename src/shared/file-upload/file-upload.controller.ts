import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  Inject,
  Body,
  Get,
  Param,
  Query,
  
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { FileUploadProvider } from './providers/upload.provider.interface';
import { Types } from 'mongoose';


@Controller('file-upload')
export class FileUploadController {
  constructor(
    @Inject('FILE_UPLOAD_PROVIDER')
    private readonly fileUploadProvider: FileUploadProvider,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: Types.ObjectId,
  ) {
    const imageUrl = await this.fileUploadProvider.upload(file, userId)
    return {
        message:'image uploaded successfully',
        success:true,
        data: {imageUrl}
    };
  }

  @Delete()
  async deleteFile(@Query('publicId') publicId: string) {
    await this.fileUploadProvider.delete(publicId);

    return {
      message: 'File deleted successfully',
    };
  }

  @Get('')
  async getFile(@Query('publicId') publicId: string){

    const image = await this.fileUploadProvider.getFile(publicId)

     return {
        message:'Done',
        success:true,
        data: {image}
    };
  }
}