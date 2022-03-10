import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  HttpStatus,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  NotFoundException,
  Query,
  Put,
} from '@nestjs/common';

import { ProductService } from './product.service';

import { CreateProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('/create')
  @UsePipes(ValidationPipe)
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      product,
    });
  }

  @Get('/')
  @UsePipes(ValidationPipe)
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('product not found');
    return res.status(HttpStatus.OK).json({
      product,
    });
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    console.log('ID ES: ', productID);
    const product = await this.productService.deleteProduct(productID);
    if (!product) throw new NotFoundException('product not found');
    return res.status(HttpStatus.OK).json({
      product,
    });
  }

  @Put('/update')
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('productID') productID,
  ) {
    const product = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!product) throw new NotFoundException('product not found');
    return res.status(HttpStatus.OK).json({
      product,
    });
  }
}
