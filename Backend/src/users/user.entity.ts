import { Cart } from 'src/cart/cart.entity';
import { Order } from 'src/order/order.entity';
import { Rate } from 'src/rate/rate.entity';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, CreateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  user_id: string = uuidv4();

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  gender: number;

  @Column({ nullable: true })
  date_of_birth: string;

  @Column({ nullable: true })
  roles: number;

  @Column({ nullable: true })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToMany(() => Cart, (cart) => cart.user)
  cartItems: Cart[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];
}