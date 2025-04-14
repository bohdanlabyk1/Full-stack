import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Filter } from './filter.entity';
import { Item } from './item.entity';

@Entity("subcategories")
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.subcategory, { cascade: true })
  items: Item[];

  @ManyToMany(() => Filter, (filter) => filter.subcategories)
  filters: Filter[];
}
