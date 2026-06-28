import { Types } from "mongoose";





export interface FileUploadProvider {
  upload(
    file: Express.Multer.File,
   userId:Types.ObjectId,
  ): Promise<{
    url: string;
    publicId: string;
  }>;

  delete(publicId: string): Promise<void>;

    getFile(publicId: string): Promise<string>;
}