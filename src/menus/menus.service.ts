import { Injectable } from '@nestjs/common';
import type { CreateMenuDto } from './dto/create-menu.dto';
import type { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  create(createMenuDto: CreateMenuDto) {
    console.log(createMenuDto);

    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  findMany(id_restaurant: string ) {
    console.log(id_restaurant);
    return this.prisma.menu.findMany({
      where: {
        AND: [
          { id_restaurant: id_restaurant === '' ? undefined : id_restaurant },
          { deleted: "false" },
        ]
      },
    });
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: updateMenuDto,
    });
  }

  remove(id: string) {
    return this.prisma.menu.delete({
      where: {
        id,
      },
    });
  }
}
