import { Injectable } from '@nestjs/common';
import type { CreateMenuDto } from './dto/create-menu.dto';
import type { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma.service';
import uploadImage from 'src/uploadImage';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  create(createMenuDto: CreateMenuDto) {
    console.log(createMenuDto);

    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  async createWithImage(
    createMenuDto: CreateMenuDto,
    menu_image?: Express.Multer.File,
  ) {
    try {
      await this.prisma.menu
        .create({
          data: createMenuDto,
        })
        .then(async (menu) => {
          return this.prisma.menu.update({
            where: {
              id_menu: menu.id_menu,
            },
            data: {
              menu_image_url: await uploadImage(
                menu.id_menu,
                'menus',
                menu_image,
              ),
            },
          });
        });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  findMany(id_restaurant: string, deleted: string) {
    if (deleted === 'true') {
      return this.prisma.menu.findMany({
        where: {
          AND: [
            { id_restaurant: id_restaurant === '' ? undefined : id_restaurant },
            { deleted: true },
          ],
        },
      });
    }
    if (deleted === 'false') {
      return this.prisma.menu.findMany({
        where: {
          AND: [
            { id_restaurant: id_restaurant === '' ? undefined : id_restaurant },
            { deleted: false },
          ],
        },
      });
    }

    return this.prisma.menu.findMany({
      where: {
        id_restaurant: id_restaurant === '' ? undefined : id_restaurant,
      },
    });
  }

  update(id_menu: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: {
        id_menu: id_menu,
      },
      data: updateMenuDto,
    });
  }

  async updateMenuImage(
    id_menu: string,
    updateMenuDto: UpdateMenuDto,
    image: Express.Multer.File,
  ) {
    return this.prisma.menu.update({
      where: {
        id_menu: id_menu,
      },
      data: {
        ...updateMenuDto,
        menu_image_url: await uploadImage(id_menu, 'menus', image),
      },
    });
  }

  remove(id_menu: string) {
    return this.prisma.menu.delete({
      where: {
        id_menu: id_menu,
      },
    });
  }
}
