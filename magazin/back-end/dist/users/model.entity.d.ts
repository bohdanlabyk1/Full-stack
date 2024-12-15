import { Cart } from './../shopin-cart/cart.entity';
export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    carts: Cart[];
}
