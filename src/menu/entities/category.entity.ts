import { ApiProperty } from '@nestjs/swagger';
import type { Menu_Category } from '@prisma/client';

export class CategoryEntity implements Menu_Category {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id_category: string;

  @ApiProperty()
  ids_product: string[];     
  
  @ApiProperty()
  ids_menu: string [];           
}
