import { IsNotEmpty } from 'class-validator';

export class AddToCart {
  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  user_id: string;
}
