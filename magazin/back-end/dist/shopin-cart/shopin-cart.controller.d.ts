import { CartService } from './shopin-cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId: number): Promise<import("./cart.entity").Cart[]>;
    addToCart(body: {
        userId: number;
        productId: number;
        quantity: number;
    }): Promise<import("./cart.entity").Cart>;
    updateQuantity(body: {
        userId: number;
        cartItemId: number;
        quantity: number;
    }): Promise<import("./cart.entity").Cart>;
    removeFromCart(body: {
        userId: number;
        cartItemId: number;
    }): Promise<void>;
}
