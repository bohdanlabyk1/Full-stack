import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './../products/products.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Отримати корзину користувача
  async getCart(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  // Додати товар у корзину
  async addToCart(userId: number, productId: number, quantity: number): Promise<Cart> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
  
    let cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
  
    if (cartItem) {
      cartItem.quantity += quantity;  // If the item already exists, increase the quantity.
    } else {
      cartItem = this.cartRepository.create({
        user: { id: userId },
        product,
        quantity,
      });
    }
  
    return this.cartRepository.save(cartItem);  // Save the cart item to the database.
  }
  

  // Редагувати кількість товару
  async updateQuantity(userId: number, cartItemId: number, quantity: number): Promise<Cart> {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartItemId, user: { id: userId } } });
    if (!cartItem) throw new NotFoundException('Cart item not found');

    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem);
  }

  // Видалити товар з корзини
  async removeFromCart(userId: number, cartItemId: number): Promise<void> {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartItemId, user: { id: userId } } });
    if (!cartItem) throw new NotFoundException('Cart item not found');

    await this.cartRepository.remove(cartItem);
  }
}
