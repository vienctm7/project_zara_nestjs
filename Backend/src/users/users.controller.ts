import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto} from './dtos/createUser.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(public usersService: UsersService) {}
  @Get()
  async getAllUsers(@Res() res: Response) {
    return await this.usersService.getAllUsers(res);
  }
  @Get('/:id')
  async getOneUser(@Param('id') id: string, @Res() res: Response) {
    return await this.usersService.getOneUser(id, res);
  }
  @Post('/registe')
  async createUser(@Body() createUser: CreateUserDto): Promise<any> {
    const result = await this.usersService.createUser(createUser);
    return result!;
  }

  @Put('/:id')
  async updateUser(
    @Body() updatedUser: any,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    return await this.usersService.updatedUser(id, updatedUser, res);
  }
}
