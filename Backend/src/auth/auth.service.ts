import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { signupDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupdto: signupDto) {
    try {
      const checkEmail = await this.usersRepo.findOne({
        where: { email: signupdto.email },
     
      });
      if (checkEmail) {
        return { message: 'Email đã được đăng ký' };
      }
      const hashedPassword = await bcrypt.hash(signupdto.password, 10); // Use bcryptjs for hashing
      
      const newUser = await this.usersRepo.create({
        username: signupdto.username,
        email: signupdto.email,
        password: hashedPassword,
        date_of_birth: signupdto.date_of_birth,
        roles: 0,
        phoneNumber: signupdto.phoneNumber,
        address: signupdto.address,
        gender: signupdto.gender,
        status: 1

      });
      await this.usersRepo.save(newUser);
      console.log(this.usersRepo);
      delete newUser.password;

      // Return success message and user data
      return { message: 'Đăng kí thành công', user: newUser };
    } catch (error) {
      // Handle errors properly and return appropriate response
      throw new Error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  }

  async login(logindto: any, res: any) {
    try {

      const user = await this.usersRepo.findOne({
        where: { email: logindto.email },
      });
      if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
      }

      const isPasswordValid = await bcrypt.compare(
        logindto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new Error('Email hoặc mật khẩu không đúng');
      }

      const token = this.jwtService.sign({ user_id: user.user_id });

      // Trả về một phản hồi thành công với mã thông báo và thông tin người dùng
      return res
        .status(200)
        .json({ message: 'Đăng nhập thành công', token, user });
    } catch (error) {
      // Nếu có lỗi xảy ra trong quá trình xử lý, ném một ngoại lệ BadRequestException với thông báo lỗi
      throw new BadRequestException(error.message);
    }
  }
}
