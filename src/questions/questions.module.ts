import { Module } from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { QuestionsController } from './controllers/questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsEntity } from './models/questions.entity';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [
    TypeOrmModule.forFeature([QuestionsEntity])
  ]
})
export class QuestionsModule { }
