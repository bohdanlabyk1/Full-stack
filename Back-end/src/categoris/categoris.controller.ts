import { Controller, Get, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './categoris.service';
import type { Express } from 'express';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }
@Get('/popularcategori')
async getPopularCategories() {
  return this.categoryService.getNewCategory();
}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Express.Multer.File, @Body('name') name: string) {
    return this.categoryService.create(name, file?.buffer);
  }
}
