import { Module } from '@nestjs/common';
import { CartItemService } from './services/cart-item.service';
import { CartItemController } from './controllers/cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CartModule } from '../cart/cart.module';
import { CaslModule } from '../auth/casl/casl.module';
import { ItemsModule } from '../items/items.module';

@Module({
  providers: [CartItemService],
  controllers: [CartItemController],
  imports: [
    TypeOrmModule.forFeature([CartItem]),
    CartModule,
    CaslModule,
    ItemsModule,
  ],
})
export class CartItemModule {}
