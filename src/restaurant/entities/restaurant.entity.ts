import { ApiProperty } from '@nestjs/swagger';
import type { Restaurant } from '@prisma/client';

export class RestaurantEntity implements Restaurant {
  @ApiProperty()
  id_restaurant: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  siret: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  food_type: string;

  @ApiProperty()
  price_range: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  banner_url: string;

  @ApiProperty()
  business_hours: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<RestaurantEntity>) {
    Object.assign(this, partial);
  }
}
