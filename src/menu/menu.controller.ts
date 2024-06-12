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

@Controller('api/menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a menu' })
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: CreateMenuDto })
  create(@Body() createMenuDto: CreateMenuDto) {
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
}
