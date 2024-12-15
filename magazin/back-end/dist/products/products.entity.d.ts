import { Category } from './../categoris/categori.entity';
import { Cart } from './../shopin-cart/cart.entity';
export declare class Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: string;
    category: Category;
    carts: Cart[];
}
