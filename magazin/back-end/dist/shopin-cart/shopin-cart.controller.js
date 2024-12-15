"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const shopin_cart_service_1 = require("./shopin-cart.service");
const common_2 = require("@nestjs/common");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getCart(userId) {
        try {
            return await this.cartService.getCart(userId);
        }
        catch (error) {
            console.error('Error getting cart:', error);
            throw new common_2.InternalServerErrorException('Failed to retrieve cart');
        }
    }
    async addToCart(body) {
        try {
            const { userId, productId, quantity } = body;
            return await this.cartService.addToCart(userId, productId, quantity);
        }
        catch (error) {
            console.error('Error adding item to cart:', error);
            if (error instanceof common_2.NotFoundException) {
                throw error;
            }
            throw new common_2.InternalServerErrorException('Failed to add to cart');
        }
    }
    async updateQuantity(body) {
        try {
            const { userId, cartItemId, quantity } = body;
            return await this.cartService.updateQuantity(userId, cartItemId, quantity);
        }
        catch (error) {
            console.error('Error updating quantity:', error);
            throw new common_2.InternalServerErrorException('Failed to update quantity');
        }
    }
    async removeFromCart(body) {
        try {
            const { userId, cartItemId } = body;
            await this.cartService.removeFromCart(userId, cartItemId);
        }
        catch (error) {
            console.error('Error removing item from cart:', error);
            throw new common_2.InternalServerErrorException('Failed to remove item from cart');
        }
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Patch)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateQuantity", null);
__decorate([
    (0, common_1.Delete)('/remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [shopin_cart_service_1.CartService])
], CartController);
//# sourceMappingURL=shopin-cart.controller.js.map