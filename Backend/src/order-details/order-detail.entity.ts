import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Product } from 'src/products/product.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  order_details_id: number;

  @Column()
  order_id: number;

  @Column()
  idProduct: number;

  @Column()
  quantity: number;

  @Column()
  address: string;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'idProduct' })
  product: Product;
}
