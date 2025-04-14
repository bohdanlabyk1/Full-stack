import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Filter } from "./filter.entity";
import { FilterService } from "./filter.service";
import { FilterController } from "./filter.controller";
import { Subcategory } from "./subfilter.entity";
import { Item } from "./item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Filter, Subcategory, Item])],
  providers: [FilterService],
  controllers: [FilterController],
  exports: [FilterService, TypeOrmModule]
})
export class FilterModule {}
