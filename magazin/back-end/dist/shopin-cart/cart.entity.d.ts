import { Product } from './../products/products.entity';
import { User } from './../users/model.entity';
export declare class Cart {
    id: number;
    user: User;
    product: Product;
    quantity: number;
}
