import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';
import { Cart } from '../shopin-cart/cart.entity';
import { Category } from '../categoris/categori.entity';
import { User } from 'src/users/model.entity';
import { Filter } from '../Filter/filter.entity';
import { Item } from '../Filter/item.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: '1111', 
      database: 'dashboard',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Product, Cart, Category, Filter, Item ], 
      logging: true, 
    }),
    TypeOrmModule.forFeature([User, Product, Cart, Category, Filter, Item ]),
  ],
})
export class DatabaseModule {}
