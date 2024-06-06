import { ApiProperty } from '@nestjs/swagger';
import type { Menu } from '@prisma/client';

export class MenuEntity implements Menu {
  @ApiProperty()
  id_menu: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  menu_ordered_categories: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
