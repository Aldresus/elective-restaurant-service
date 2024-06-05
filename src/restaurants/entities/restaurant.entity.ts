import { ApiProperty } from '@nestjs/swagger';
import type { Restaurant } from '@prisma/client';

export class RestaurantEntity implements Restaurant {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    siret: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    price_range: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    postal_code: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    rating: string;

    @ApiProperty()
    banner_url: string;

    @ApiProperty()
    business_hours: string;

    @ApiProperty()
    restaurant_order_categories: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor(partial: Partial<RestaurantEntity>) {
        Object.assign(this, partial);
    }
}
