import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurant/restaurant.module';
import { ProductsModule } from './product/product.module';
import { MenusModule } from './menu/menu.module';
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
