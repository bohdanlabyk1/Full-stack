import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './shopin-cart.service';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:userId')
  async getCart(@Param('userId') userId: number) {
    try {
      return await this.cartService.getCart(userId);
    } catch (error) {
      console.error('Error getting cart:', error);
      throw new InternalServerErrorException('Failed to retrieve cart');
    }
  }

  @Post('add')
async addToCart(@Body() body: { userId: number; productId: number; quantity: number }) {
  try {
    const { userId, productId, quantity } = body;
    return await this.cartService.addToCart(userId, productId, quantity);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to add to cart');
  }
}


  @Patch('/update')
  async updateQuantity(
    @Body() body: { userId: number; cartItemId: number; quantity: number }
  ) {
    try {
      const { userId, cartItemId, quantity } = body;
      return await this.cartService.updateQuantity(userId, cartItemId, quantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw new InternalServerErrorException('Failed to update quantity');
    }
  }

  @Delete('/remove')
  async removeFromCart(
    @Body() body: { userId: number; cartItemId: number }
  ) {
    try {
      const { userId, cartItemId } = body;
      await this.cartService.removeFromCart(userId, cartItemId);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw new InternalServerErrorException('Failed to remove item from cart');
    }
  }
}
