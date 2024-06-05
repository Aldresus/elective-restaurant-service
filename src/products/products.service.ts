import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    console.log(createProductDto);

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findMany( id_restaurant ) {
    return this.prisma.product.findMany({
      where: {
        AND: [
          {
            id_restaurant: id_restaurant === '' ? undefined : id_restaurant,
          },
          {
            deleted: "false",
          }
        ]
      }
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id: id,
      },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
