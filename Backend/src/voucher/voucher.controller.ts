import { Controller, Get, Param, Res } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { Response } from 'express';
@Controller('voucher')
export class VoucherController {
  constructor(public voucherService: VoucherService) {}
  @Get('/:voucher')
  getOneVoucher(@Param('voucher') voucher: string, @Res() res: Response) {
    return this.voucherService.getOneVoucher(voucher, res);
  }
}
