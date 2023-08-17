import {
  Controller,
  Res,
  Get,
  Body,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { Response } from 'express';
import { NewRate } from './dtos/rate.dto';
@Controller('rate')
export class RateController {
  constructor(public rateService: RateService) {}
  @Get('/:id')
  getRateByProduct(@Param('id') id: string, @Res() res: Response) {
    return this.rateService.getRateByProduct(id, res);
  }
  @Post()
  createNewRate(@Body() newRate: NewRate, @Res() res: Response) {
    return this.rateService.createNewRate(newRate, res);
  }
  @Delete('/:id')
  deleteRate(@Param('id') id: string, @Res() res: Response) {
    return this.rateService.deleteRate(id, res);
  }
}
