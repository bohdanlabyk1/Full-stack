import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "../products/products.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'longblob', nullable: true })
  image: Buffer;
  @Column({ default: false }) 
  isPopularcategori: boolean;
  

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
