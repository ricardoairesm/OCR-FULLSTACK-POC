import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageService } from './image.service';
import { Prisma } from '@prisma/client';
import type { ImageUploadDTO, ImageUploadResponse } from 'src/types/images';


@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(id);
  }

  @Post()
  uploadUserFile(@Body() createImageDto: ImageUploadDTO): Promise<ImageUploadResponse> {
    return this.imageService.uploadUserFile(createImageDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: Prisma.ImageUpdateInput) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
