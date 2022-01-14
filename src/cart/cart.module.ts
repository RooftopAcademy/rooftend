import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { CaslModule } from '../auth/casl/casl.module';
import { CartItemModule } from '../cart-item/cart-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,User]), CaslModule, CartItemModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
