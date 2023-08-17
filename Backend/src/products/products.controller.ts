import {
  Controller,
  Res,
  Get,
  Body,
  Post,
  Param,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { InfoProduct, NewProduct } from './dtos/products.dto';
@Controller('products')
export class ProductsController {
  constructor(public productsService: ProductsService) {}
  @Get()
  getAllProducts(@Res() res: Response) {
    return this.productsService.getAllProducts(res);
  }
  @Get('/details/:id')
  getOneProduct(@Res() res: Response, @Param('id') id: string) {
    return this.productsService.getOneProduct(res, id);
  }
  @Get('/:id')
  getProductByCategory(@Res() res: Response, @Param('id') id: string) {
    return this.productsService.getProductByCategory(res, id);
  }
  @Get('/find/search')
  getProductBySearch(@Query('key') key: string, @Res() res: Response) {
    return this.productsService.getProductBySearch(key, res);
  }
  @Post()
  addNewProduct(@Body() newProduct: NewProduct, @Res() res: Response) {
    return this.productsService.addNewProduct(newProduct, res);
  }
  @Put()
  updateProduct(@Body() infoUpdate: any, @Res() res: Response) {
    return this.productsService.updateProduct(infoUpdate, res);
  }
  @Delete('/:id')
  deleteProduct(@Param('id') id: string, @Res() res: Response) {
    return this.productsService.deleteProduct(id, res);
  }
}
