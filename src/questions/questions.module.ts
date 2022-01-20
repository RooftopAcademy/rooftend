import { Module } from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { QuestionsController } from './controllers/questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AnswersService } from './services/answers.service';
import { CaslModule } from '../auth/casl/casl.module';

@Module({
  providers: [QuestionsService, AnswersService],
  controllers: [QuestionsController],
  imports: [TypeOrmModule.forFeature([Question, Answer]), CaslModule],
})
export class QuestionsModule {}
