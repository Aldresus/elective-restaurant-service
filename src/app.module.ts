import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ProductsModule } from './products/products.module';
import { MenusModule } from './menus/menus.module';
import { UsersRestaurantsModule } from './users_restaurants/users_restaurants.module';

@Module({
  imports: [
    RestaurantsModule,
    ProductsModule,
    MenusModule,
    UsersRestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
