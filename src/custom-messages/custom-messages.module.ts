import { Module } from '@nestjs/common';
import { CustomMessagesService } from './services/custom-messages.service';
import { CustomMessagesController } from './controllers/custom-messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomMessage } from './entities/custom-messages.entity';

@Module({
  providers: [CustomMessagesService],
  controllers: [CustomMessagesController],
  imports: [
    TypeOrmModule.forFeature([CustomMessage])
  ],
})
export class CustomMessagesModule { }
