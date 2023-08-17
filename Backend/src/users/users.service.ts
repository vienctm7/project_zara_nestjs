import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, createUserBody } from './dtos/createUser.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async getAllUsers(res) {
    try {
      const allUsers = await this.usersRepository.find();
      return res.json({
        allUsers,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async getOneUser(id, res) {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { user_id: id },
      });
      return res.json({
        findUser,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async createUser(userDetail: createUserBody) {
    try {
      const isEmail = await this.usersRepository.findOne({
        where: {
          email: userDetail.email,
        },
      });
      if (isEmail) throw new BadRequestException('Email đã tồn tại');
      const hashedPassword = await bcrypt.hash(userDetail.password, 10);
      const newUser = await this.usersRepository.create({
        email: userDetail.email,
        password: hashedPassword,
      });
      this.usersRepository.save(newUser);
      return {
        status: 201,
        message: 'post thành công ',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  async updatedUser(id, updatedUser, res) {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { user_id: id },
      });

      // findUser.username = updatedUser.username;
      // findUser.address = updatedUser.address;
      // findUser.gender = updatedUser.gender;
      // findUser.date_of_birth = updatedUser.date_of_birth;
      findUser.status = updatedUser.status;
      await this.usersRepository.save(findUser);
      return res.json({
        findUser,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
