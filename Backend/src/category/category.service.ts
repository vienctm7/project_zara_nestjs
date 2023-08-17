import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async getAllCategory(res) {
    const allCategory = await this.categoryRepository.find();
    return res.json({ allCategory });
  }
  
  async getOneCategory(res, category) {
    const findCategory = await this.categoryRepository.findOne({
      where: { category_id: category.id },
    });
    return res.json({ findCategory });
  }
}
