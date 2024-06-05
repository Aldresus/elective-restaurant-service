import { ApiProperty } from '@nestjs/swagger';
import type { Product } from '@prisma/client';

export class ProductEntity implements Product {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    id_restaurant: string;

    @ApiProperty()
    deleted: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
