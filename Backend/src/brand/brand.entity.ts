import { Category } from 'src/category/category.entity';
import { Product } from 'src/products/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  brand_id: number;

  @Column()
  brand_name: string;

  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.brands)
  @JoinColumn({ name: 'category_id' })
  category: Category;
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
