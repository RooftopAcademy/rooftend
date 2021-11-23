import { Module } from '@nestjs/common';
import { CartItemService } from './services/cart-item.service';
import { CartItemController } from './controllers/cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cartItem } from './models/cart-item.entity';

@Module({
  providers: [CartItemService],
  controllers: [CartItemController],
  imports: [
    TypeOrmModule.forFeature([cartItem])
  ]
})
export class CartItemModule { }
