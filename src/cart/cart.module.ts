import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,User])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
