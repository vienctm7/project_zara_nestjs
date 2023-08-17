import { Brand } from 'src/brand/brand.entity';
import { Product } from 'src/products/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @OneToMany(() => Brand, (brand) => brand.category)
  brands: Brand[];
  @OneToMany(() => Product, product => product.category, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  products: Product[];
}
