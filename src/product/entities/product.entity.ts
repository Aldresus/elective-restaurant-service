import { ApiProperty } from '@nestjs/swagger';
import type { Product } from '@prisma/client';

export class ProductEntity implements Product {
  @ApiProperty()
  id_product: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  product_image_url: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  ids_menus_products: string[];

  @ApiProperty()
  ids_menu_category: string[];

  @ApiProperty()
  ids_restaurant_category: string[];

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
