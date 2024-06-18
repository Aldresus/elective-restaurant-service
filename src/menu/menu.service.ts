import { Injectable } from '@nestjs/common';
import type { CreateMenuDto } from './dto/create-menu.dto';
import type { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateProductCategoryDto } from './dto/update-category';
import { CreateCategoryDto } from './dto/create-category';
import { connect } from 'http2';
import { Prisma } from '@prisma/client';
@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  getById(id_menu: string) {
    return this.prisma.menu.findUnique({
      where: {
        id_menu: id_menu,
      },
      include: {
        Menu_Categories: {
          include: {
            Product: true,
          },
        },
      },
    });
  }

  findMany(id_restaurant: string, deleted: string) {
    return this.prisma.menu.findMany({
      where: {
        AND: [
          { id_restaurant: id_restaurant === '' ? undefined : id_restaurant },
        ],
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

  remove(id_menu: string) {
    return this.prisma.menu.delete({
      where: {
        id_menu: id_menu,
      },
    });
  }

  createCategory(createCategoryDto: CreateCategoryDto) {

    return this.prisma.menu_Category.create({
      data: {
        name: createCategoryDto.name,
        ids_product: createCategoryDto.ids_product,
        Menus: {
          connect: createCategoryDto.ids_menu.map(id => ({
            id_menu: id
          })),
        }
      }
    })
  }

  updateCategory(updateProductCategoryDto: UpdateProductCategoryDto){

    return this.prisma.$transaction(async (prisma) => {
      // Update the category
      console.log(updateProductCategoryDto)
      const updatedCategory = await prisma.menu_Category.update({
        where: {
          id_category: updateProductCategoryDto.id_category,
        },
        data: updateProductCategoryDto.updateCategoryDto,
      });

      const updatedProduct = await prisma.product.update({
        where: {
          id_product: updateProductCategoryDto.id_product
        },
        data: updateProductCategoryDto.updateProductDto,
      })

      return updatedCategory
    })
  }

  removeCategory(id_category: string){
    return this.prisma.menu_Category.delete({
      where: {
        id_category: id_category
      }
    })
  }
}
