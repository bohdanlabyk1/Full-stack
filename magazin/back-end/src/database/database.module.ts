import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categoris/categori.entity';
import { Product } from 'src/products/products.entity';
import { Cart } from 'src/shopin-cart/cart.entity';
import { User } from 'src/users/model.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Database type (MySQL)
      host: 'localhost', // Host
      port: 3306, // MySQL port
      username: 'root', // Username
      password: '12345', // Password
      database: 'product', // Database name
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Synchronize schema (not recommended in production)
      entities: [User, Product, Category, Cart], // Add entities here
    }),
    TypeOrmModule.forFeature([User, Product, Category, Cart]), // Register entities with TypeOrmModule
  ],
})
export class DatabaseModule {}
