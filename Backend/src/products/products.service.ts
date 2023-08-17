import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}
  async getAllProducts(res) {
    try {
      const products = await this.productsRepository
      .createQueryBuilder('p')
      .select(['p.*', 'b.*', 'c.*'])
      .innerJoin('brand', 'b', 'p.brand_id = b.brand_id')
      .innerJoin('category', 'c', 'p.category_id = c.category_id')
      .getRawMany();
      return res.status(200).json({
        products,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }
  async getProductByCategory(res, id) {
    try {
      const products = await this.productsRepository.find({
        where: { category_id: id },
      });
      return res.json({
        products,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async getProductBySearch(key, res) {
    try {
      const products = await this.productsRepository
        .createQueryBuilder('product')
        .where('product_name LIKE :name', { name: `%${key}%` })
        .getMany();
      return res.json({
        products,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async getOneProduct(res, id) {
    try {
      const findProduct = await this.productsRepository.findOne({
        where: { product_id: id },
      });
      return res.json({
        findProduct,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async addNewProduct(newProduct, res) {
    try {
      const product = await this.productsRepository.create({
        brand_id: newProduct.brand_id,
        category_id: newProduct.category_id,
        price: newProduct.price,
        product_image: newProduct.product_image,
        product_name: newProduct.product_name,
        product_stocks: newProduct.product_stocks,
        description: newProduct.description,
        care: newProduct.care,
        
      });
      await this.productsRepository.save(product);
      return res.status(201).json({
        message: 'Add to Product successfully',
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async updateProduct(infoProduct, res) {
    try {
      for (let i = 0; i < infoProduct.length; i++) {
        const productId = infoProduct[i].idProduct;
        const quantity = infoProduct[i].quantity;
        // Retrieve the product from the database by its ID
        const product = await this.productsRepository.findOne({
          where: { product_id: productId },
        });
        if (!product) {
          throw new BadRequestException(
            `Product with ID ${productId} not found.`,
          );
        }
        product.product_stocks -= quantity;
        product.sold += quantity;
        await this.productsRepository.save(product);
      }
      res.json({
        status: 200,
        message: 'Số lượng sản phẩm đã được cập nhật trong kho.',
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async deleteProduct(id, res) {
    try {
      const rate = await this.productsRepository.findOne({
        where: { product_id: id },
      });
      await this.productsRepository.remove(rate);
      return res.status(200).json({
        message: 'Đã xóa sản phẩm thành công!',
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
