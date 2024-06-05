import { Controller, Get, Post, Body, Patch, Param, Delete, Query, } from '@nestjs/common';
import { UsersRestaurantsService } from './users_restaurants.service';
import { CreateUsersRestaurantDto } from './dto/create-users_restaurant.dto';
import { UpdateUsersRestaurantDto } from './dto/update-users_restaurant.dto';
import { ApiBody, ApiCreatedResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { UsersRestaurantEntity } from './entities/users_restaurant.entity';

@Controller('users-restaurants')
@ApiTags('users-restaurants')
export class UsersRestaurantsController {
  constructor(private readonly usersRestaurantsService: UsersRestaurantsService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateUsersRestaurantDto })
  @ApiBody({ type: CreateUsersRestaurantDto })
  create(@Body() createUsersRestaurantDto) {
    return this.usersRestaurantsService.create(createUsersRestaurantDto);
  }

  @Get()
  findAll(
    @Query('id_restaurant') idRestaurant: string,
    @Query('id_user') idUser: string,
  ) {
    console.log(idRestaurant, idUser);

    return this.usersRestaurantsService.findMany({ id_restaurant: idRestaurant, id_user: idUser });
  }

  @Patch(':id')
  @ApiResponseProperty({ type: UpdateUsersRestaurantDto })
  update(@Param('id') id: string, @Body() updateUsersRestaurantDto) {
    return this.usersRestaurantsService.update(id, updateUsersRestaurantDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: UsersRestaurantEntity })
  remove(@Param('id') id: string) {
    return this.usersRestaurantsService.remove(id);
  }
}
