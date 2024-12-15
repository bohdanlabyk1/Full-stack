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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("./products.entity");
const categori_entity_1 = require("./../categoris/categori.entity");
let ProductService = class ProductService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async findAll() {
        try {
            return await this.productRepository.find({ relations: ['category'] });
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching products', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(name, price, description, categoryId) {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
        });
        if (!category) {
            throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
        }
        const product = this.productRepository.create({ name, price, description, category });
        try {
            return await this.productRepository.save(product);
        }
        catch (error) {
            throw new common_1.HttpException('Error saving product', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByCategory(categoryId) {
        const categoryIdNumber = parseInt(categoryId, 10);
        if (isNaN(categoryIdNumber)) {
            throw new common_1.HttpException('Invalid category ID', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.productRepository.find({
            where: { category: { id: categoryIdNumber } },
            relations: ['category'],
        });
    }
    async searchProducts(query) {
        return this.productRepository.find({
            where: { name: (0, typeorm_2.Like)(`%${query}%`) },
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(categori_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=products.service.js.map