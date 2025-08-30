import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { ImageUploadDTO } from '@repo/types';
import { DatabaseService } from 'src/database/database.service';
import Tesseract from 'tesseract.js';

@Injectable()
export class ImageService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createImageDto: Prisma.ImageCreateInput) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: Prisma.ImageUpdateInput) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  async uploadUserFile(createImageDto: ImageUploadDTO): Promise<string> {
    const response = await Tesseract.recognize(createImageDto.content!, 'eng');
    const user: User | null = await this.databaseService.user.findUnique({
      where: { id: createImageDto.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }
    try{
      const newImage: Prisma.ImageCreateInput = {
        name: createImageDto.fileName,
        user: { connect: { id: createImageDto.userId } },
        content: response.data.text,
        src: createImageDto.content!,
      };
      await this.databaseService.image.create({ data: newImage });
    } catch(error){
      console.error('Error creating image record:', error);
      throw error;
    }
    return response.data.text;
  }
}
