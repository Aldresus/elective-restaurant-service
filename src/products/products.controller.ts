import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('api/product')
@ApiTags('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get orders with optional filters' })
  @ApiCreatedResponse({ type: ProductEntity, isArray: true })
  @ApiQuery({ name: 'id_restaurant', required: false, type: String })
  findAll(@Query('id_restaurant') idRestaurant: string) {
    console.log(idRestaurant);

    return this.productsService.findMany(idRestaurant);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product with ID' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string, @Body() updateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product with ID' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
