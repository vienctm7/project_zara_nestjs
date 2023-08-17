import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  Length,
  IsNumber,
} from 'class-validator';

export type createUserBody = {
  email: string;
  password: string;
};

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @Length(10, 15)
  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsNumber()
  gender: number;

  @IsDate()
  date_of_birth: Date;

  @IsNotEmpty()
  @IsNumber()
  roles: number;

  @IsString()
  status: string;


}
