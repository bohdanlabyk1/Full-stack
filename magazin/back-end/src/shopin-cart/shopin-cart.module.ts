import { Module } from '@nestjs/common';
import { Cart } from './cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './shopin-cart.service';
import { CartController } from './shopin-cart.controller';
import { ProductsModule } from 'src/products/products.module';


@Module({
    imports: [TypeOrmModule.forFeature([Cart]), ProductsModule],
    controllers: [CartController],
    providers: [CartService],
    exports: [TypeOrmModule],
})
export class ShopinCartModule {}
