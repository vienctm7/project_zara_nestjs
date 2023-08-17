import { IsNotEmpty } from 'class-validator';

export class NewOrder {
  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  note: string;

  @IsNotEmpty()
  method: string;
}
