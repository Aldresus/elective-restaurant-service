import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersRestaurantDto {
    @ApiProperty()
    id_restaurant: string;

    @ApiProperty()
    id_user: string;
}
