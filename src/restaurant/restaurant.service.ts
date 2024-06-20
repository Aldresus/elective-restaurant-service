import { Injectable } from '@nestjs/common';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto';
import type { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma.service';
import uploadImage from 'src/uploadImage';
import {
  AddMenuInCategoryDto,
  AddProductInCategoryDto,
} from './dto/update-category';
import { CreateRestaurantCategoryDto } from './dto/create-category';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    console.log(createRestaurantDto);

    return this.prisma.restaurant.create({
      data: createRestaurantDto,
    });
  }

  async createWithImage(
    createRestaurantDto: CreateRestaurantDto,
    image?: Express.Multer.File,
  ) {
    try {
      await this.prisma.restaurant.create({
        data: {
          ...createRestaurantDto,
          banner_url: await uploadImage('restaurants', image),
        },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
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
            food_type: data.category === '' ? undefined : data.category,
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

  getById(id_restaurant: string) {
    return this.prisma.restaurant.findUnique({
      where: {
        id_restaurant: id_restaurant,
      },
      include: {
        Restaurant_Categories: {
          include: {
            Products: true,
            Menus: true,
          },
        },
      },
    });
  }

  getByUserId(id_user: string) {
    console.log('id_user', id_user);

    return this.prisma.users_Restaurants.findMany({
      where: {
        id_user: id_user,
      },
      include: {
        restaurant: true,
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

  async updateRestaurantImage(
    id_restaurant: string,
    updateRestaurantDto: UpdateRestaurantDto,
    image: Express.Multer.File,
  ) {
    return this.prisma.restaurant.update({
      where: {
        id_restaurant: id_restaurant,
      },
      data: {
        ...updateRestaurantDto,
        banner_url: await uploadImage('restaurants', image),
      },
    });
  }

  remove(id_restaurant: string) {
    return this.prisma.restaurant.delete({
      where: {
        id_restaurant: id_restaurant,
      },
    });
  }

  createCategory(createRestaurantCategoryDto: CreateRestaurantCategoryDto) {
    console.log('id_restaurant: ', createRestaurantCategoryDto.id_restaurant);
    return this.prisma.restaurant_Category.create({
      data: {
        name: createRestaurantCategoryDto.name,
        Products: {
          connect: createRestaurantCategoryDto.ids_product.map((id) => ({
            id_product: id,
          })),
        },
        Menus: {
          connect: createRestaurantCategoryDto.ids_menu.map((id) => ({
            id_menu: id,
          })),
        },
        Restaurant: {
          connect: { id_restaurant: createRestaurantCategoryDto.id_restaurant },
        },
      },
    });
  }

  addProductCategory(addProductInCategoryDto: AddProductInCategoryDto) {
    return this.prisma.$transaction(async (prisma) => {
      const { id_restaurant_category, updateCategoryDto } =
        addProductInCategoryDto;
      const { ids_product } = updateCategoryDto;

      // Fetch the current products in the category
      const currentCategory = await prisma.restaurant_Category.findUnique({
        where: {
          id_restaurant_category: id_restaurant_category,
        },
        include: {
          Products: {
            select: {
              id_product: true,
            },
          },
        },
      });

      // Extract the current product ids
      const currentProductIds = currentCategory.Products.map(
        (product) => product.id_product,
      );

      // Determine the products to disconnect (those that are not in ids_product)
      const idsToDisconnect = currentProductIds.filter(
        (id) => !ids_product.includes(id),
      );

      // Disconnect products that are not in ids_product
      await prisma.restaurant_Category.update({
        where: {
          id_restaurant_category: id_restaurant_category,
        },
        data: {
          Products: {
            disconnect: idsToDisconnect.map((id) => ({ id_product: id })),
          },
        },
      });

      // Connect the products that are in ids_product
      const updatedCategory = await prisma.restaurant_Category.update({
        where: {
          id_restaurant_category: id_restaurant_category,
        },
        data: {
          Products: {
            connect: ids_product.map((id) => ({ id_product: id })),
          },
        },
      });

      return updatedCategory;
    });
  }

  addMenuCategory(addMenuInCategoryDto: AddMenuInCategoryDto) {
    return this.prisma.$transaction(async (prisma) => {
      const { id_restaurant_category, updateCategoryDto } =
        addMenuInCategoryDto;
      const { ids_menu } = updateCategoryDto;

      // Fetch the current menus in the category
      const currentCategory = await prisma.restaurant_Category.findUnique({
        where: {
          id_restaurant_category: id_restaurant_category,
        },
        include: {
          Menus: {
            select: {
              id_menu: true,
            },
          },
        },
      });

      // Extract the current menu ids
      const currentMenuIds = currentCategory.Menus.map((menu) => menu.id_menu);

      // Determine the menus to disconnect (those that are not in ids_menu)
      const idsToDisconnect = currentMenuIds.filter(
        (id) => !ids_menu.includes(id),
      );

      // Disconnect menus that are not in ids_menu
      await prisma.restaurant_Category.update({
        where: {
          id_restaurant_category: id_restaurant_category,
        },
        data: {
          Menus: {
            disconnect: idsToDisconnect.map((id) => ({ id_menu: id })),
          },
        },
      });

      // Connect the menus that are in ids_menu
      const updatedCategory = await prisma.restaurant_Category.update({
        where: {
          id_restaurant_category: id_restaurant_category,
        },
        data: {
          Menus: {
            connect: ids_menu.map((id) => ({ id_menu: id })),
          },
        },
      });

      return updatedCategory;
    });
  }

  removeCategory(id_restaurant_category: string) {
    return this.prisma.restaurant_Category.delete({
      where: {
        id_restaurant_category: id_restaurant_category,
      },
    });
  }
}
