import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MenuEntity } from './entities/menu.entity';

import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryEntity } from './entities/category.entity';
import {
  UpdateCategoryDto,
  UpdateProductCategoryDto,
} from './dto/update-category';
import { CreateCategoryDto } from './dto/create-category';

@Controller('api/menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a menu' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: CreateMenuDto })
  create(@Body() createMenuDto: CreateMenuDto) {
    console.log('Create menu dto', createMenuDto);
    return this.menuService.create(createMenuDto);
  }

  @Post(':id/image')
  @ApiOperation({ summary: 'Create a menu with an image' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: CreateMenuDto })
  @UseInterceptors(FileInterceptor('image'))
  createWithImage(
    @Body() createMenuDto: CreateMenuDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.menuService.createWithImage(createMenuDto, image);
  }

  @Post('category')
  @ApiOperation({ summary: 'Create a category' })
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiBody({ type: CreateCategoryDto })
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.menuService.createCategory(createCategoryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu with ID' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiParam({ name: 'id', type: String })
  getById(@Param('id') id_menu: string) {
    const test = this.menuService.getById(id_menu);
    console.log(id_menu, test);
    return test;
  }

  @Get()
  @ApiOperation({ summary: 'Get menus with optional filters' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiQuery({ name: 'id_restaurant', required: false, type: String })
  @ApiQuery({ name: 'deleted', required: false, type: Boolean })
  findAll(
    @Query('id_restaurant') idRestaurant: string,
    @Query('deleted') deleted: string,
  ) {
    console.log(idRestaurant, deleted);
    return this.menuService.findMany(idRestaurant, deleted);
  }

  @Patch('productCategory')
  @ApiOperation({ summary: 'Update menu category with ID' })
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiBody({ type: UpdateProductCategoryDto })
  updateCategory(@Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.menuService.updateCategory(updateProductCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update menu with ID' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: UpdateMenuDto })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id_menu: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id_menu, updateMenuDto);
  }

  @Patch(':id/image')
  @ApiOperation({ summary: 'Update menu image with ID' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: UpdateMenuDto })
  @UseInterceptors(FileInterceptor('image'))
  @ApiParam({ name: 'id', type: String })
  updateMenuImage(
    @Param('id') id_menu: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.menuService.updateMenuImage(id_menu, updateMenuDto, image);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete menu with ID' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id_menu: string) {
    return this.menuService.remove(id_menu);
  }

  @Delete('category/:id')
  @ApiOperation({ summary: 'Delete category with ID' })
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiParam({ name: 'id', type: String })
  removeCategory(@Param('id') id_category: string) {
    return this.menuService.removeCategory(id_category);
  }
}
