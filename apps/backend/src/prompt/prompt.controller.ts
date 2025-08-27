import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { Prisma } from '@prisma/client';

@Controller('post')
export class PromptController {
  constructor(private readonly postService: PromptService) {}

  @Post()
  create(@Body() createPostDto: Prisma.PromptsCreateInput) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: Prisma.PromptsUpdateInput) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
