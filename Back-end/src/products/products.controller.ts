import { Controller, Get, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  @Get("popular")
  async getPopularProducts() {
    return this.productService.getPopularProducts();
  }
  
  @Get("new")
  async getNewProducts() {
    return this.productService.getNewProducts();
  }

  @Get('/by-item/:itemId')
  async getProductByItem(@Param('itemId') itemId: number): Promise<ProductDto[]> {
    return this.productService.getProductByItem(itemId);
  }
  
  @Get('category/:categoryId')
  async getProductsByCategory(@Param('categoryId') categoryId: string): Promise<ProductDto[]> {
    return this.productService.findByCategory(categoryId);
  }

  @Get('search')
  async searchProducts(@Query('query') query: string): Promise<ProductDto[]> {
    return this.productService.searchProducts(query);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Get('image/:id')
  async getProductImage(@Param('id') id: string) {
    const productId = Number(id); 
    console.log('Received product ID:', productId); 

    if (isNaN(productId)) {
      throw new HttpException('Invalid product ID', HttpStatus.BAD_REQUEST);
    }

    const product = await this.productService.findOne(productId);

    if (!product || !product.image) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }

    const imageBuffer = product.image;

    if (!Buffer.isBuffer(imageBuffer)) {
      throw new HttpException('Invalid image format', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const base64Image = imageBuffer.toString('base64');
    const imageDataUrl = `data:image/jpeg;base64,${base64Image}`;

    return { image: imageDataUrl };
  }
}
