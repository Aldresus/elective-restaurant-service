import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
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

