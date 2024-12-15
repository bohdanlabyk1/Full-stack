import { Repository } from 'typeorm';
import { Category } from './categori.entity';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findAll(): Promise<Category[]>;
    create(name: string): Promise<Category>;
}
