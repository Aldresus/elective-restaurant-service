import { Module } from '@nestjs/common';
import { UsersRestaurantsService } from './users_restaurants.service';
import { UsersRestaurantsController } from './users_restaurants.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersRestaurantsController],
  providers: [UsersRestaurantsService, PrismaService],
})
export class UsersRestaurantsModule {}
