import { CategoryService } from './categoris.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<import("./categori.entity").Category[]>;
    create(name: string): Promise<import("./categori.entity").Category>;
}
