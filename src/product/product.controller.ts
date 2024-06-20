import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //   inutile ?
  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post(':id/image')
  @ApiOperation({ summary: 'Create a product with an image' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: CreateProductDto })
  @UseInterceptors(FileInterceptor('image'))
  createWithImage(
    @Body() createMenuDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productService.createWithImage(createMenuDto, image);
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
  findAllProducts(@Param('id_product') idProduct: string) {
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

  @Patch(':id/image')
  @ApiOperation({ summary: 'Update product image with ID' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: UpdateProductDto })
  @UseInterceptors(FileInterceptor('image'))
  @ApiParam({ name: 'id', type: String })
  updateProductImage(
    @Param('id') id_product: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productService.updateProductImage(
      id_product,
      updateProductDto,
      image,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product with ID' })
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id_product: string) {
    return this.productService.remove(id_product);
  }
}
