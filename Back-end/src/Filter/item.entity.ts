import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Subcategory } from './subfilter.entity';
import { Product } from './../products/products.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.items, { onDelete: 'CASCADE' })
  subcategory: Subcategory;

  @OneToMany(() => Product, (product) => product.item) 
  products: Product[];
}
