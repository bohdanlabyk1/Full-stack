import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './products.entity';
import { Category } from './../categoris/categori.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Метод для отримання всіх продуктів з категоріями
  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find({ relations: ['category'] });
    } catch (error) {
      throw new HttpException('Error fetching products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Метод для створення нового продукту
  async create(
    name: string,
    price: number,
    description: string,
    categoryId: number,
  ): Promise<Product> {
    // Перевірка наявності категорії
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    // Створення та збереження продукту
    const product = this.productRepository.create({ name, price, description, category });
    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new HttpException('Error saving product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Метод для отримання продуктів за категорією
  async findByCategory(categoryId: string): Promise<Product[]> {
    const categoryIdNumber = parseInt(categoryId, 10);
    if (isNaN(categoryIdNumber)) {
      throw new HttpException('Invalid category ID', HttpStatus.BAD_REQUEST);
    }
  
    return this.productRepository.find({
      where: { category: { id: categoryIdNumber } },
      relations: ['category'],
    });
  }
  

  // Пошук продуктів за назвою
  async searchProducts(query: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { name: Like(`%${query}%`) },
    });
  }
}
