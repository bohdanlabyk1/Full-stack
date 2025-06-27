// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from './../shopin-cart/cart.entity'; // Import the Cart entity
import { Product } from 'src/products/products.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  // user.entity.ts
@Column({ nullable: true })
phone: string;

@Column({ nullable: true })
patronymic: string;

@Column({ nullable: true })
birthdate: string;

@Column({ nullable: true })
gender: string;

@Column({ nullable: true })
language: string;

@Column({ nullable: true })
description: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
  // user.entity.ts
@OneToMany(() => Product, (product) => product.user)
products: Product[];

}
