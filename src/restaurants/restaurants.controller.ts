import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('restaurants')
@ApiTags('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: CreateRestaurantDto })
  create(@Body() createRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiCreatedResponse({ type: RestaurantEntity, isArray: true })
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
      Rating
    });
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: UpdateRestaurantDto })
  update(@Param('id') id: string, @Body() updateRestaurantDto) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: RestaurantEntity })
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
