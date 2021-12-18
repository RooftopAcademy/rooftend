import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswersService } from './services/answers.service';


@Module({
  providers: [AnswersService],
  imports: [TypeOrmModule.forFeature([Answer])],
})
export class AnswersModule { }
