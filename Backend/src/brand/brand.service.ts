import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}
  async getAllBrand(res) {
    const allBrand = await this.brandRepository.find();
    return res.json({ allBrand });
  }
  async getOneBrand(res, id) {
    const findBrand = await this.brandRepository.find({
      where: { category_id: id },
    });
    return res.json({ findBrand });
  }
}
