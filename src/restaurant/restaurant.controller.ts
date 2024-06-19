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
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RestaurantCategoryEntity } from './entities/category.entity';
import {
  AddMenuInCategoryDto,
  AddProductInCategoryDto,
} from './dto/update-category';
import { CreateRestaurantCategoryDto } from './dto/create-category';

@Controller('api/restaurant')
@ApiTags('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantsService: RestaurantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: CreateRestaurantDto })
  create(@Body() createRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Post('restaurantCategory')
  @ApiOperation({ summary: 'Create a restaurant category' })
  @ApiCreatedResponse({ type: RestaurantCategoryEntity })
  @ApiBody({ type: CreateRestaurantCategoryDto })
  createCategory(
    @Body() createRestaurantCategoryDto: CreateRestaurantCategoryDto,
  ) {
    return this.restaurantsService.createCategory(createRestaurantCategoryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiParam({ name: 'id', type: String })
  getById(@Param('id') id_restaurant: string) {
    return this.restaurantsService.getById(id_restaurant);
  }
  @Get('user/:user_id')
  @ApiOperation({ summary: 'Get restaurant ny user_id' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiParam({ name: 'user_id', type: String })
  getByUserId(@Param('user_id') user_id: string) {
    return this.restaurantsService.getByUserId(user_id);
  }

  @Get()
  @ApiOperation({ summary: 'Get restaurants with optional filters' })
  @ApiCreatedResponse({ type: RestaurantEntity, isArray: true })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'city', required: false, type: String })
  @ApiQuery({ name: 'price_range', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'rating_e', required: false, type: Number })
  @ApiQuery({ name: 'rating_gt', required: false, type: Number })
  @ApiQuery({ name: 'rating_lt', required: false, type: Number })
  findMany(
    @Query('name') name: string,
    @Query('city') city: string,
    @Query('price_range') price_range: string,
    @Query('category') category: string,
    @Query('rating_e') ratingE: number,
    @Query('rating_gt') ratingGT: number,
    @Query('rating_lt') ratingLT: number,
  ) {
    return this.restaurantsService.findMany({
      name,
      city,
      price_range,
      category,
      rating_e: Number(ratingE) || undefined,
      rating_gt: Number(ratingGT) || undefined,
      rating_lt: Number(ratingLT) || undefined,
    });
  }

  @Patch('addProductCategory')
  @ApiOperation({ summary: 'Update menu category with ID' })
  @ApiCreatedResponse({ type: RestaurantCategoryEntity })
  @ApiBody({ type: AddProductInCategoryDto })
  addProductCategory(@Body() addProductInCategoryDto: AddProductInCategoryDto) {
    return this.restaurantsService.addProductCategory(addProductInCategoryDto);
  }

  @Patch('addMenuCategory')
  @ApiOperation({ summary: 'Update menu category with ID' })
  @ApiCreatedResponse({ type: RestaurantCategoryEntity })
  @ApiBody({ type: AddMenuInCategoryDto })
  addMenuCategory(@Body() addMenuInCategoryDto: AddMenuInCategoryDto) {
    return this.restaurantsService.addMenuCategory(addMenuInCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id_restaurant: string, @Body() updateRestaurantDto) {
    return this.restaurantsService.update(id_restaurant, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id_restaurant: string) {
    return this.restaurantsService.remove(id_restaurant);
  }

  @Delete('category/:id')
  @ApiOperation({ summary: 'Delete category with ID' })
  @ApiCreatedResponse({ type: RestaurantCategoryEntity })
  @ApiParam({ name: 'id', type: String })
  removeCategory(@Param('id') id_restaurant_category: string) {
    return this.restaurantsService.removeCategory(id_restaurant_category);
  }
}
