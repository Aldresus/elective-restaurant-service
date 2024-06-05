import { Injectable } from '@nestjs/common';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto';
import type { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    console.log(createRestaurantDto);

    return this.prisma.restaurant.create({
      data: createRestaurantDto,
    });
  }

  findMany(data: { Name: string, City: string, PriceRange: string, Category: string, Rating: string }) {
    return this.prisma.restaurant.findMany({
      where: {
        AND: [
          { name: data.Name === '' ? undefined : data.Name },
          { city: data.City === '' ? undefined : data.City },
          { price_range: data.PriceRange === '' ? undefined : data.PriceRange },
          { category: data.Category === '' ? undefined : data.Category },
          { rating: data.Rating === '' ? undefined : data.Rating },
        ]
      }
    });
  }

  update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: {
        id: id,
      },
      data: updateRestaurantDto,
    });
  }

  remove(id: string) {
    return this.prisma.restaurant.delete({
      where: {
        id: id,
      },
    });
  }
}
