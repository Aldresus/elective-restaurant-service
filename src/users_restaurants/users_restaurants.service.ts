import { Injectable } from '@nestjs/common';
import type { CreateUsersRestaurantDto } from './dto/create-users_restaurant.dto';
import type { UpdateUsersRestaurantDto } from './dto/update-users_restaurant.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersRestaurantsService {
  constructor(private prisma: PrismaService) {}

  create(createUsersRestaurantDto) {
    return this.prisma.users_Restaurants.create({
      data: createUsersRestaurantDto,
    });
  }

  findMany(ids: { id_restaurant: string; id_user: string }) {
    return this.prisma.users_Restaurants.findMany({
      where: {
        AND: [
          {
            id_restaurant:
              ids.id_restaurant === '' ? undefined : ids.id_restaurant,
          },
          { id_user: ids.id_user === '' ? undefined : ids.id_user },
        ],
      },
    });
  }

  update(id_user_restaurant: string, updateUsersRestaurantDto) {
    return this.prisma.users_Restaurants.update({
      where: {
        id_user_restaurant: id_user_restaurant,
      },
      data: updateUsersRestaurantDto,
    });
  }

  remove(id_user_restaurant: string) {
    return this.prisma.users_Restaurants.delete({
      where: {
        id_user_restaurant: id_user_restaurant,
      },
    });
  }
}
