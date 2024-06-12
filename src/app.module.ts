import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurant/restaurant.module';
import { ProductsModule } from './product/product.module';
import { MenusModule } from './menu/menu.module';

@Module({
  imports: [RestaurantsModule, ProductsModule, MenusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
