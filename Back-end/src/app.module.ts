import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule} from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './categoris/categoris.module';
import { ShopinCartModule } from './shopin-cart/shopin-cart.module';
import { FilterModule } from './Filter/filter.module';



@Module({
  imports: [
   DatabaseModule,
   AuthModule,
   ProductsModule,
   CategoryModule,
   ShopinCartModule,
FilterModule,
  ],
})
export class AppModule {}