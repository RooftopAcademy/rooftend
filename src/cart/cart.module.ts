import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { Cart } from './entities/cart.entity';
import { User } from '../entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,User])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
