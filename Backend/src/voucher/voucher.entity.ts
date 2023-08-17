import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn()
  voucher_id: number;

  @Column()
  voucher_discount: number;

  @Column()
  voucher_name: string;
}
