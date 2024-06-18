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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('api/product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get orders with optional filters' })
  @ApiCreatedResponse({ type: ProductEntity, isArray: true })
  @ApiQuery({ name: 'id_restaurant', required: false, type: String })
  findAll(@Query('id_restaurant') idRestaurant: string) {
    console.log(idRestaurant);
    return this.productService.findMany(idRestaurant);
  }

  @Get(':id_product')
  @ApiOperation({ summary: 'Get products with optional filters' })
  @ApiCreatedResponse({ type: ProductEntity, isArray: true })
  @ApiParam({ name: 'id_product', type: String })
  findAllProducts(
    @Param('id_product') idProduct: string,
  ) {
    console.log(idProduct);
    return this.productService.findUnique(idProduct);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product with ID' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id_product: string, @Body() updateProductDto) {
    return this.productService.update(id_product, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product with ID' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id_product: string) {
    return this.productService.remove(id_product);
  }
}
