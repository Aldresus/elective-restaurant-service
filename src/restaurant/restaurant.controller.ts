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
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post(':id/image')
  @ApiOperation({ summary: 'Create a restaurant with an image' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: CreateRestaurantDto })
  @UseInterceptors(FileInterceptor('image'))
  createWithImage(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.restaurantsService.createWithImage(createRestaurantDto, image);
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

  @Patch(':id')
  @ApiOperation({ summary: 'Update restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id_restaurant: string, @Body() updateRestaurantDto) {
    return this.restaurantsService.update(id_restaurant, updateRestaurantDto);
  }

  @Patch(':id/image')
  @ApiOperation({ summary: 'Update restaurant image with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiBody({ type: UpdateRestaurantDto })
  @UseInterceptors(FileInterceptor('image'))
  @ApiParam({ name: 'id', type: String })
  updateRestaurantImage(
    @Param('id') id_restaurant: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.restaurantsService.updateRestaurantImage(
      id_restaurant,
      updateRestaurantDto,
      image,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete restaurant with ID' })
  @ApiCreatedResponse({ type: RestaurantEntity })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id_restaurant: string) {
    return this.restaurantsService.remove(id_restaurant);
  }
}
