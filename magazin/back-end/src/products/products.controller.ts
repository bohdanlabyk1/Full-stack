import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './products.entity';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    console.log("Fetching all products");
    return this.productService.findAll();
  }

  // Отримуємо продукти за категорією
  @Get('category/:categoryId')
async getProductsByCategory(@Param('categoryId') categoryId: string): Promise<Product[]> {
  return this.productService.findByCategory(categoryId);
}


  // Пошук продуктів за назвою
  @Get('search')
  async searchProducts(@Query('query') query: string): Promise<Product[]> {
    return this.productService.searchProducts(query);
  }
}
