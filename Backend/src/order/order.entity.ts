import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Timestamp,
  BeforeInsert,
} from 'typeorm';
import { OrderDetails } from '../order-details/order-detail.entity';
const moment = require('moment-timezone');
const currentDate = moment()
  .tz('Asia/Ho_Chi_Minh')
  .format('YYYY-MM-DD HH:mm:ss');
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  customerId: string;

  @Column()
  total: number;

  @Column({ nullable: true })
  note: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Timestamp;

  @Column()
  status: string;

  @Column()
  method: string;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order, {
    cascade: true,
  })
  orderDetails: OrderDetails[];
}
