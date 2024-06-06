import { ApiProperty } from '@nestjs/swagger';
import type { Users_Restaurants } from '@prisma/client';

export class UsersRestaurantEntity implements Users_Restaurants {
  @ApiProperty()
  id_user_restaurant: string;

  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  id_user: string;
}
