import { ApiProperty } from '@nestjs/swagger';
import type { Restaurant_Category } from '@prisma/client';

export class RestaurantCategoryEntity implements Restaurant_Category {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id_restaurant_category: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  ids_product: string[];     
  
  @ApiProperty()
  ids_menu: string [];           
}
