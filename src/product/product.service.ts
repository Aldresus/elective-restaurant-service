import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    console.log(createProductDto);

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findMany(id_restaurant: string, deleted: string) {
    if (deleted === 'true') {
      return this.prisma.product.findMany({
        where: {
          id_restaurant: id_restaurant === '' ? undefined : id_restaurant,
          deleted: true,
        },
      });
    } else if (deleted === 'false') {
      return this.prisma.product.findMany({
        where: {
          id_restaurant: id_restaurant === '' ? undefined : id_restaurant,
          deleted: false,
        },
      });
    } else {
      return this.prisma.product.findMany({
        where: {
          id_restaurant: id_restaurant === '' ? undefined : id_restaurant,
        },
      });
    }
  }

  update(id_product: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id_product: id_product,
      },
      data: updateProductDto,
    });
  }

  remove(id_product: string) {
    return this.prisma.product.delete({
      where: {
        id_product: id_product,
      },
    });
  }
}