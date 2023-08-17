import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './order-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}
  async getOneOrderDetails(id, res) {
    console.log(id);

    try {
      const orderDetails = await this.orderDetailsRepository.query(
        `SELECT order_details.order_id,
          order_details.quantity,
          order_details.address,
          product.product_image,
          product.product_name,
          product.price,
          newtgdd.order.total,
          user.user_name,
          user.phoneNumber
          FROM order_details
          INNER JOIN product ON order_details.idProduct = product.product_id
          INNER JOIN newtgdd.order ON order_details.order_id = newtgdd.order.order_id
          INNER JOIN newtgdd.user ON user.user_id = newtgdd.order.customerId
          WHERE order_details.order_id = ?`,
        [id],
      );
      return res.status(200).json({
        status: 200,
        orderDetails,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createOrderDetails(orderDetails, res) {
    try {
      for (const detail of orderDetails) {
        const newOrderDetail = new OrderDetails();
        newOrderDetail.order_id = detail.order_id;
        newOrderDetail.idProduct = detail.idProduct;
        newOrderDetail.quantity = detail.quantity;
        newOrderDetail.address = detail.address;
        await this.orderDetailsRepository.save(newOrderDetail);
      }
      return res.status(200).json({
        message: 'hihi',
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
