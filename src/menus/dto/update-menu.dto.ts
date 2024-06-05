import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: string;

    @ApiProperty()
    deleted: string;

    @ApiProperty()
    id_restaurant: string;

    @ApiProperty()
    menu_ordered_categories: string;
}
