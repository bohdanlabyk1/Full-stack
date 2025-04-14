import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Filter } from "./filter.entity";

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Filter)
    private filterRepository: Repository<Filter>
  ) {}

  async getFilters(): Promise<Filter[]> {
    return await this.filterRepository.find({
      relations: ['subcategories', 'subcategories.items',  'subcategories.items.products'],
    });;
  }
}
