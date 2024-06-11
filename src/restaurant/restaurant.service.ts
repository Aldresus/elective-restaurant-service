import { Injectable } from '@nestjs/common';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto';
import type { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    console.log(createRestaurantDto);

    return this.prisma.restaurant.create({
      data: createRestaurantDto,
    });
  }

  findMany(data: {
    name: string;
    city: string;
    price_range: string;
    category: string;
    rating_e: number;
    rating_gt: number;
    rating_lt: number;
  }) {
    return this.prisma.restaurant.findMany({
      where: {
        AND: [
          {
            name: data.name === '' ? undefined : data.name,
          },
          {
            city: data.city === '' ? undefined : data.city,
          },
          {
            price_range: data.price_range === '' ? undefined : data.price_range,
          },
          {
            category: data.category === '' ? undefined : data.category,
          },
          {
            rating: {
              equals: data.rating_e,
              gt: data.rating_gt,
              lt: data.rating_lt,
            },
          },
        ],
      },
    });
  }

  update(id_restaurant: string, updateRestaurantDto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: {
        id_restaurant: id_restaurant,
      },
      data: updateRestaurantDto,
    });
  }

  remove(id_restaurant: string) {
    return this.prisma.restaurant.delete({
      where: {
        id_restaurant: id_restaurant,
      },
    });
  }
}
