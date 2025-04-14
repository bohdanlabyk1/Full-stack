import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './categoris.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  async create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }
}
