import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from './voucher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private voucherRepository: Repository<Voucher>,
  ) {}
  async getOneVoucher(voucher, res) {
    try {
      const findVoucher = await this.voucherRepository.find({
        where: { voucher_name: voucher },
      });
      return res.status(200).json({
        findVoucher,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
