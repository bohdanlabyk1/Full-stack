// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from './../shopin-cart/cart.entity'; // Import the Cart entity

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

  // Add this line to define the one-to-many relationship with Cart
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
