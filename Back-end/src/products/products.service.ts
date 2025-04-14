import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './products.entity';
import { Category } from './../categoris/categori.entity';
import { ProductDto } from './product.Dto';
import { Item } from './../Filter/item.entity';
import { Filter } from 'src/Filter/filter.entity';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Item) 
    private itemRepository: Repository<Item>,
    @InjectRepository(Filter)
    private filterRepository: Repository<Filter>,
  ) {}


  async getPopularProducts(): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      where: { isPopular: true },
      take: 10,
      relations: ['category'],
    });
  
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image 
        ? `data:image/png;base64,${Buffer.from(product.image).toString('base64')}` 
        : null,
      categoryId: product.category?.id || null,
    }));
  }
  
async getNewProducts(): Promise<ProductDto[]> {
  const products = await this.productRepository.find({
    where: { isNew: true },
    take: 10,
    relations: ['category'],
  });

  return products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image 
      ? `data:image/png;base64,${Buffer.from(product.image).toString('base64')}` 
      : null,
    categoryId: product.category?.id || null,
  }));
}

  async getProductByItem(itemId: number): Promise<ProductDto[]> {

    const item = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: ['products'],  
    });
  
    if (!item || !item.products || item.products.length === 0) {
      throw new HttpException('Products not found for this item', HttpStatus.NOT_FOUND);
    }
    
    return item.products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image ? `data:image/png;base64,${product.image.toString('base64')}` : null,
      categoryId: product.category?.id || null, 
    }));
  }
  
  async findAll(): Promise<ProductDto[]> {
    try {
      const products = await this.productRepository.find({ relations: ['category'] });

      return products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image 
        ? `data:image/png;base64,${Buffer.from(product.image).toString('base64')}` 
        : null,
        categoryId: product.category.id, 
      }));
    } catch (error) {
      throw new HttpException('Error fetching products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(
    name: string,
    price: number,
    description: string,
    categoryId: number,
  ): Promise<ProductDto> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const product = this.productRepository.create({ name, price, description, category });

    try {
      const savedProduct = await this.productRepository.save(product);
      return {
        id: savedProduct.id,
        name: savedProduct.name,
        price: savedProduct.price,
        description: savedProduct.description,
        image: null, 
        categoryId: savedProduct.category.id, 
      };
    } catch (error) {
      throw new HttpException('Error saving product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByCategory(categoryId: string): Promise<ProductDto[]> {
    const categoryIdNumber = parseInt(categoryId, 10);
    if (isNaN(categoryIdNumber)) {
      throw new HttpException('Invalid category ID', HttpStatus.BAD_REQUEST);
    }

    const products = await this.productRepository.find({
      where: { category: { id: categoryIdNumber } },
      relations: ['category'],
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image 
        ? `data:image/png;base64,${Buffer.from(product.image).toString('base64')}` 
        : null,
      categoryId: product.category.id, 
    }));
  }

  async searchProducts(query: string): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      where: { name: Like(`%${query}%`) },
      relations: ['category'], 
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image ? `data:image/png;base64,${product.image.toString('base64')}` : null,
      categoryId: product.category.id, 
    }));
  }

  async findOne(id: number): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'filters'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image ? `data:image/png;base64,${product.image.toString('base64')}` : null,
      categoryId: product.category.id, 
    };
  }

  async getProductsByFilter(filterId: number): Promise<Product[]> {
    const filter = await this.filterRepository.findOne({
      where: { id: filterId },
      relations: ['subcategories', 'subcategories.items', 'subcategories.items.products'],
    });
  
    if (!filter) {
      throw new HttpException('Filter not found', HttpStatus.NOT_FOUND);
    }
  
    const products = filter.subcategories.flatMap(sub =>
      sub.items.flatMap(item => item.products || [])
    );
  
    return products;
  }
  
}
