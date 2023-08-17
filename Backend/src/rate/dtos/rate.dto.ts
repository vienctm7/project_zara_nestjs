import { IsNotEmpty } from 'class-validator';

export class NewRate {
  @IsNotEmpty()
  pro_id: number;

  @IsNotEmpty()
  rate: number;

  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  userId: string;

}
