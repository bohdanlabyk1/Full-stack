import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Category } from './../categoris/categori.entity';
import { Cart } from './../shopin-cart/cart.entity';
import { Item } from './../Filter/item.entity';
import { Filter } from 'src/Filter/filter.entity';
import { User } from './../users/model.entity';


@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'longblob', nullable: true })
  image: Buffer;

  @Column({ default: false }) 
  isPopular: boolean;
  
  @Column({ default: false }) 
  isNew: boolean;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
  category: Category;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @ManyToOne(() => Item, (item) => item.products, { onDelete: 'CASCADE' })
item: Item;

@ManyToMany(() => Filter, filter => filter.products)
filters: Filter[];
// products.entity.ts


@ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
user: User;

}
