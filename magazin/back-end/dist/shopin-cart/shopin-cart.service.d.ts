import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './../products/products.entity';
export declare class CartService {
    private cartRepository;
    private productRepository;
    constructor(cartRepository: Repository<Cart>, productRepository: Repository<Product>);
    getCart(userId: number): Promise<Cart[]>;
    addToCart(userId: number, productId: number, quantity: number): Promise<Cart>;
    updateQuantity(userId: number, cartItemId: number, quantity: number): Promise<Cart>;
    removeFromCart(userId: number, cartItemId: number): Promise<void>;
}
