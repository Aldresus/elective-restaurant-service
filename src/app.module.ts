import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ProductsModule } from './products/products.module';
import { MenusModule } from './menus/menus.module';
import { UsersRestaurantsModule } from './users_restaurants/users_restaurants.module';

@Module({
  imports: [RestaurantsModule, ProductsModule, MenusModule, UsersRestaurantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
