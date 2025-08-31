import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import type { ImageUploadDTO, ImageUploadResponse } from 'src/types/images';
import { DatabaseService } from 'src/database/database.service';
import Tesseract from 'tesseract.js';

@Injectable()
export class ImageService {
  constructor(private readonly databaseService: DatabaseService) { }
  create(createImageDto: Prisma.ImageCreateInput) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: string) {
    return this.databaseService.image.findMany({ where: { userId: id }, include: { prompts: true } })
  }

  findOneByName(name: string, userId: string) {
    return this.databaseService.image.findFirst({ where: { name, userId } })
  }

  update(id: number, updateImageDto: Prisma.ImageUpdateInput) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  async uploadUserFile(createImageDto: ImageUploadDTO): Promise<ImageUploadResponse> {
    const user: User | null = await this.databaseService.user.findUnique({
      where: { id: createImageDto.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }
    try {
      const newImage: Prisma.ImageCreateInput = {
        name: createImageDto.fileName,
        user: { connect: { id: createImageDto.userId } },
        content: createImageDto.content,
        src: "",
      };
      const createdImage = await this.databaseService.image.create({ data: newImage });
      return { extractedText: "", imageId: createdImage.id };
    } catch (error) {
      console.error('Error creating image record:', error);
      throw error;
    }
  }
}
