import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
}
