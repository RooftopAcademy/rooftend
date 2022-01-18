import { Module } from '@nestjs/common';
import { MessagePostPurchaseService } from './services/message-post-purchase.service';
import { MessagePostPurchaseController } from './controllers/message-post-purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagePostPurchase } from './entities/message-post-purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessagePostPurchase])],
  providers: [MessagePostPurchaseService],
  controllers: [MessagePostPurchaseController],
})
export class MessagePostPurchasesModule {}
