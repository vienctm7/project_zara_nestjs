import { Controller, Get, Post, Res, Body, Param } from '@nestjs/common';
import { Response } from 'express';
import { OrderDetailsService } from './order-details.service';
@Controller('order-details')
export class OrderDetailsController {
  constructor(public orderDetailsService: OrderDetailsService) {}
  @Get('/:id')
  async getOneOrderDetails(@Param('id') id: number, @Res() res: Response) {
    return await this.orderDetailsService.getOneOrderDetails(id, res);
  }
  @Post()
  async createOrderDetails(@Body() orderDetails: any, @Res() res: Response) {
    return await this.orderDetailsService.createOrderDetails(orderDetails, res);
  }
}
