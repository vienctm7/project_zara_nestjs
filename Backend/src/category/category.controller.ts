import { Controller, Res, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Response } from 'express';
@Controller('category')
export class CategoryController {
  constructor(public categoryService: CategoryService) {}
  @Get()
  getAllCategory(@Res() res: Response) {
    return this.categoryService.getAllCategory(res);
  }
  
  @Get('/:id')
  getOneCategory(@Param('id') id: string, @Res() res: Response) {
    console.log(id);
    return this.categoryService.getOneCategory(res, id);
  }
}
