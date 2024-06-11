import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurant.service';
import { RestaurantsController } from './restaurant.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService, PrismaService],
})
export class RestaurantsModule {}
