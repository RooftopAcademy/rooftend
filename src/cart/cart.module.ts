import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { CaslModule } from '../auth/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,User]), CaslModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
