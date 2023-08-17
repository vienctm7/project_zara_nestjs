import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  async getAllOrder(res) {
    try {
      const order = await this.orderRepository.query(
        'SELECT newtgdd.order.order_id, newtgdd.order.customerId, newtgdd.order.total, newtgdd.order.note, newtgdd.order.createdDate, newtgdd.order.status, newtgdd.order.method, user.user_name, user.phoneNumber  FROM newtgdd.order INNER JOIN user ON newtgdd.order.customerId = user.user_id',
      );
      return res.status(200).json({ order });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getOneOrder(user_id, res) {
    try {
      const order = await this.orderRepository.find({
        where: { customerId: user_id },
      });
      return res.status(200).json({ order });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createOrder(newOrder, res) {
    try {
      const createNewOrder = await this.orderRepository.create({
        customerId: newOrder.customerId,
        total: newOrder.total,
        note: newOrder.note,
        method: newOrder.method,
        status: 'Chờ xác nhận',
      });
      await this.orderRepository.save(createNewOrder);
      return res.status(200).json({
        createNewOrder,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteOrder(id, res) {
    try {
      const deletedOrder = await this.orderRepository.findOne({
        where: { order_id: id },
      });
      await this.orderRepository.remove(deletedOrder);
      return res.status(200).json({
        message: 'hehehe',
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
