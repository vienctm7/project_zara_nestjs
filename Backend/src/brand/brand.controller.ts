import { Controller, Get, Param, Res } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Response } from 'express';
@Controller('brand')
export class BrandController {
  constructor(public brandService: BrandService) {}
  @Get()
  getAllBrand(@Res() res: Response) {
    return this.brandService.getAllBrand(res);
  }
  @Get('/:id')
  getOneBrand(@Param('id') id: string, @Res() res: Response) {
    return this.brandService.getOneBrand(res, id);
  }
}
