import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate) private rateRepository: Repository<Rate>,
  ) {}
  async getRateByProduct(id, res) {
    try {
      const rates = await this.rateRepository
        .createQueryBuilder('rate')
        .leftJoinAndSelect('rate.user', 'user') // Left Join with the User table
        .where('rate.pro_id = :id', { id })
        .getRawMany();
      return res.json({
        rates,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async createNewRate(newRate, res) {
    try {
      const rate = await this.rateRepository.create({
        pro_id: newRate.pro_id,
        rate_points: newRate.rate,
        comment: newRate.comment,
        idUser: newRate.userId,
      });
      await this.rateRepository.save(rate);
      return res.status(201).json({
        messages: 'Successful',
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async deleteRate(id, res) {
    try {
      const rate = await this.rateRepository.findOne({
        where: { rate_id: id },
      });
      await this.rateRepository.remove(rate);
      return res.status(200).json({
        message: 'kekek',
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
