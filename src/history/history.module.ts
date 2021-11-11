import { Module } from '@nestjs/common';
import { HistoryController } from './controllers/history/history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './models/history.entity';
import { HistoryService } from './services/history/history.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([History])
  ],
  providers: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule {}
