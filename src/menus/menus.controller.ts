import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MenuEntity } from './entities/menu.entity';

@Controller('menus')
@ApiTags('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: CreateMenuDto })
  create(@Body() createMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @ApiCreatedResponse({ type: MenuEntity })
  findAll(
    @Query('id_restaurant') idRestaurant: string,
  ) {
    console.log(idRestaurant);

    return this.menusService.findMany(idRestaurant);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: UpdateMenuDto })
  update(@Param('id') id: string, @Body() updateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: MenuEntity })
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}
