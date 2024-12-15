import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './../categoris/categori.entity';
import { Cart } from './../shopin-cart/cart.entity'; 

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column({ type: 'blob', nullable: true })
image: string;

@Column()
categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];  // Відношення з корзиною

}
