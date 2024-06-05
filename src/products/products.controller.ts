import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ProductEntity, isArray: true })
  findAll(
    @Query('id_restaurant') idRestaurant: string,
  ) {
    console.log(idRestaurant);

    return this.productsService.findMany(idRestaurant);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id') id: string, @Body() updateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ProductEntity })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
