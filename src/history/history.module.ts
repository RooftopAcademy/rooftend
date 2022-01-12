import { Module } from '@nestjs/common';
import { HistoryController } from './controllers/history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './models/history.entity';
import { HistoryService } from './services/history.service';
import { CaslModule } from '../auth/casl/casl.module';

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
  imports: [TypeOrmModule.forFeature([History]), CaslModule],
})
export class HistoryModule {}
