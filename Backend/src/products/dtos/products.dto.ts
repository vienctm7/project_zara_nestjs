import { IsNotEmpty } from 'class-validator';

export class NewProduct {
  @IsNotEmpty()
  brand_id: number;

  @IsNotEmpty()
  category_id: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;  

  @IsNotEmpty()
  product_image: string;

  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  product_stocks: number;

}

export class InfoProduct {
  @IsNotEmpty()
  order_id: number;
  @IsNotEmpty()
  idProduct: number;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  address: number;
}