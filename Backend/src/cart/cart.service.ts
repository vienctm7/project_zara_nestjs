import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { log } from 'console';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  // async getAllCart(res) {
  //     const allCart = await this.cartRepository.find();
  //   return res.json({ allCart });
  // }

  async getAllCart(res) {
    try {
      const cart = await this.cartRepository
        .createQueryBuilder('cart')
        .select([
          'cart.user_id as user_id',
          'cart.quantity as quantity',
          'products.product_stocks as product_stocks ',
          'products.product_id as product_id',
          'products.product_name as product_name',
          'products.product_image as product_image',
          'products.price as price',
        ])
        .innerJoin('cart.product', 'products')
        .getRawMany();

      return res.status(200).json({
        cart,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  
}

  async getOneCart(id, res) {
    try {
      const cart = await this.cartRepository
        .createQueryBuilder('cart')
        .select([
          'cart.user_id as user_id',
          'cart.cart_id as cart_id',
          'cart.quantity as quantity',
          'products.product_stocks as product_stocks ',
          'products.product_id as product_id',
          'products.product_name as product_name',
          'products.product_image as product_image',
          'products.price as price',
          
        ])
        .innerJoin('cart.product', 'products')
        .where('cart.user_id = :id', { id })
        .getRawMany();

      return res.status(200).json({
        cart,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async addToCart(product, res: Response) {
    try {
      const existingProductInCart = await this.cartRepository.findOne({
        where: { product_id: product.product_id },
      });
      if (existingProductInCart) {
        existingProductInCart.quantity += 1;
        await this.cartRepository.save(existingProductInCart);
        return res.status(201).json({
          message: 'Add to Cart successfully!',
        });
      } else {
        const newCartItem = this.cartRepository.create({
          user_id: product.user_id,
          product_id: product.product_id,
          quantity: 1,
        });
        await this.cartRepository.save(newCartItem);
        return res.status(201).json({
          message: 'Add to Cart successfully',
        });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteCartAfterPay(id, res) {
    try {
      const findCartUser = await this.cartRepository.find({
        where: { user_id: id },
      });
      await this.cartRepository.remove(findCartUser);

      res.json({
        status: 200,
        message: 'Cart has been deleted after payment.',
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteProduct(id, user_id, res: Response) {
    try {
      const userCart = await this.cartRepository.find({
        where: { user_id: user_id },
      });
      if (!userCart || userCart.length === 0) {
        throw new BadRequestException('User cart is not found');
      }
      
      console.log(userCart);
      console.log(id);
      
      const productToDelete = userCart.filter(
        (cartItem) => cartItem.cart_id === +id,
      );
      console.log(productToDelete);
      
      if (productToDelete.length === 0) {
        throw new BadRequestException(
          "Product is not found in the user's cart",
        );
      }
  
      for (const product of productToDelete) {
        await this.cartRepository.remove(product);
      }
  
      return res.status(200).json({
        message: "Product has been deleted from the user's cart",
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
