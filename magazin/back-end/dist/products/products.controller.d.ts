import { ProductService } from './products.service';
import { Product } from './products.entity';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    findAll(): Promise<Product[]>;
    getProductsByCategory(categoryId: string): Promise<Product[]>;
    searchProducts(query: string): Promise<Product[]>;
}
