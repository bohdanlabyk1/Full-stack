import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categori.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

 async findAll(): Promise<any[]> {
  const categories = await this.categoryRepository.find({ relations: ['products'] });

  return categories.map(category => ({
    id: category.id,
    name: category.name,
    image: category.image
      ? `data:image/png;base64,${Buffer.from(category.image).toString('base64')}`
      : null,
  }));
}

async getNewCategory(): Promise<any[]> {
  const categories = await this.categoryRepository.find({
    where: { isPopularcategori: true },
    take: 10,
    relations: ['products'],
  });

  return categories.map(category => ({
    id: category.id,
    name: category.name,
    image: category.image
      ? `data:image/png;base64,${Buffer.from(category.image).toString('base64')}`
      : null,
  }));
}
async create(name: string, image?: Buffer): Promise<Category> {
  const category = this.categoryRepository.create({ name, image });
  return this.categoryRepository.save(category);
}

}
