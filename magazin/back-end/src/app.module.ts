import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './categoris/categoris.module';
import { ShopinCartModule } from './shopin-cart/shopin-cart.module';


@Module({
  imports: [
   DatabaseModule,
   UsersModule,
   ProductsModule,
   CategoryModule,
   ShopinCartModule,
  ],
})
export class AppModule {}