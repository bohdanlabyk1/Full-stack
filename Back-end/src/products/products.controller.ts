import {
  Controller,
  Get,
  Param,
  UploadedFile,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto } from './product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../users/jwt';
import { RequestWithUser } from '../users/Users'; // <== обов'язково

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: {
      name: string;
      price: number;
      description: string;
      categoryId: number;
      userId: number;
    },
  ) {
    const { name, price, description, categoryId, userId } = body;
    const imageBuffer = file?.buffer || null;

    return this.productService.create(
      name,
      price,
      description,
      categoryId,
      userId,
      imageBuffer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyProducts(@Req() req: RequestWithUser) {
    return this.productService.getProductsByUser(req.user.id);
  }

  @Get()
  async findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  @Get('popular')
  async getPopularProducts() {
    return this.productService.getPopularProducts();
  }

  @Get('new')
  async getNewProducts() {
    return this.productService.getNewProducts();
  }

  @Get('by-item/:itemId')
  async getProductByItem(@Param('itemId') itemId: number): Promise<ProductDto[]> {
    return this.productService.getProductByItem(itemId);
  }

  @Get('category/:categoryId')
  async getProductsByCategory(@Param('categoryId') categoryId: string): Promise<ProductDto[]> {
    return this.productService.findByCategory(categoryId);
  }

  @Get('image/:id')
  async getProductImage(@Param('id') id: string) {
    const productId = Number(id);
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
    return { image: `data:image/jpeg;base64,${base64Image}` };
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.findOne(id);
  }
}
