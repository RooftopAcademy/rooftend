import { Module } from '@nestjs/common';
import { CartItemService } from './services/cart-item.service';
import { CartItemController } from './controllers/cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Item } from '../items/entities/items.entity';

@Module({
  providers: [CartItemService],
  controllers: [CartItemController],
  imports: [TypeOrmModule.forFeature([CartItem, Item])],
  exports: [CartItemService],
})
export class CartItemModule { }
