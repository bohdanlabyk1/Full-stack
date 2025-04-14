import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Subcategory } from "./subfilter.entity";
import { Product } from "src/products/products.entity";

@Entity("filters")
export class Filter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Subcategory, (subcategory) => subcategory.filters)
  @JoinTable({
    name: "subcategory_filters",
    joinColumn: { name: "filter_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "subcategory_id", referencedColumnName: "id" },
  })
  subcategories: Subcategory[];

  @ManyToMany(() => Product, (product) => product.filters)
  products: Product[];
}
