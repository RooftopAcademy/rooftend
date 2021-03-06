import { Module } from '@nestjs/common';
import { HistoryController } from './controllers/history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './models/history.entity';
import { HistoryService } from './services/history.service';

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
  imports: [TypeOrmModule.forFeature([History])],
})
export class HistoryModule {}
