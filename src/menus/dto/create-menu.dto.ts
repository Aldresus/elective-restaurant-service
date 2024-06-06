import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  menu_ordered_categories: string;
}
