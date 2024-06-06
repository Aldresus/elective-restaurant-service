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
import { RestaurantsService } from './restaurants.service';
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

@Controller('api/restaurant')
@ApiTags('restaurant')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: CreateRestaurantDto })
  create(@Body() createRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get restaurants with optional filters' })
  @ApiCreatedResponse({ type: RestaurantEntity, isArray: true })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'city', required: false, type: String })
  @ApiQuery({ name: 'price_range', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'rating', required: false, type: String })
  findMany(
    @Query('name') Name: string,
    @Query('city') City: string,
    @Query('price_range') PriceRange: string,
    @Query('category') Category: string,
    @Query('rating') Rating: string,
  ) {
    return this.restaurantsService.findMany({
      Name,
      City,
      PriceRange,
      Category,
      Rating,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string, @Body() updateRestaurantDto) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
