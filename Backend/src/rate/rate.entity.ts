import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  rate_id: number;

  @Column()
  pro_id: number;

  @Column({ default: true })
  idUser: string;

  @Column()
  rate_points: number;

  @Column({ type: 'longtext' })
  comment: string;

  @ManyToOne(() => Product, (product) => product.rates)
  @JoinColumn({ name: 'pro_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.rates)
  @JoinColumn({ name: 'idUser' })
  user: User;
}
