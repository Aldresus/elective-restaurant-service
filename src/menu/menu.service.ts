import { Injectable } from '@nestjs/common';
import type { CreateMenuDto } from './dto/create-menu.dto';
import type { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  create(createMenuDto: CreateMenuDto) {
    console.log(createMenuDto);

    return this.prisma.menu.create({
      data: createMenuDto,
    });
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
    } else if (deleted === 'false') {
      return this.prisma.menu.findMany({
        where: {
          AND: [
            { id_restaurant: id_restaurant === '' ? undefined : id_restaurant },
            { deleted: false },
          ],
        },
      });
    } else {
      return this.prisma.menu.findMany({
        where: {
          id_restaurant: id_restaurant === '' ? undefined : id_restaurant,
        },
      });
    }
  }

  update(id_menu: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: {
        id_menu: id_menu,
      },
      data: updateMenuDto,
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
