import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { Category } from './../categoris/categori.entity';
export declare class ProductService {
    private productRepository;
    private categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    findAll(): Promise<Product[]>;
    create(name: string, price: number, description: string, categoryId: number): Promise<Product>;
    findByCategory(categoryId: string): Promise<Product[]>;
    searchProducts(query: string): Promise<Product[]>;
}
