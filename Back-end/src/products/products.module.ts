import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './products.service';
import { Product } from './products.entity';
import { CategoryModule } from 'src/categoris/categoris.module';
import { ProductController } from './products.controller';
import { FilterModule } from 'src/Filter/filter.module';
import { User } from 'src/users/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User]), CategoryModule, FilterModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
