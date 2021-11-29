import { Module } from '@nestjs/common';
import { CartItemService } from './services/cart-item.service';
import { CartItemController } from './controllers/cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './models/cart-item.entity';

@Module({
  providers: [CartItemService],
  controllers: [CartItemController],
  imports: [
    TypeOrmModule.forFeature([CartItem])
  ]
})
export class CartItemModule { }
