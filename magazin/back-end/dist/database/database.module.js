"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categori_entity_1 = require("../categoris/categori.entity");
const products_entity_1 = require("../products/products.entity");
const cart_entity_1 = require("../shopin-cart/cart.entity");
const model_entity_1 = require("../users/model.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '12345',
                database: 'product',
                autoLoadEntities: true,
                synchronize: true,
                entities: [model_entity_1.User, products_entity_1.Product, categori_entity_1.Category, cart_entity_1.Cart],
            }),
            typeorm_1.TypeOrmModule.forFeature([model_entity_1.User, products_entity_1.Product, categori_entity_1.Category, cart_entity_1.Cart]),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map