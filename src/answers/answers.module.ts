import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswersService } from './services/answers.service';
import { AnswersController } from './controllers/answers.controller';
import { Question } from '../questions/entities/question.entity';
@Module({
  providers: [AnswersService],
  imports: [TypeOrmModule.forFeature([Answer, Question])],
  controllers: [AnswersController],
})
export class AnswersModule { }
