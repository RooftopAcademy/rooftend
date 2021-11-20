import { Module } from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { QuestionsController } from './controllers/questions.controller';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController]
})
export class QuestionsModule { }
