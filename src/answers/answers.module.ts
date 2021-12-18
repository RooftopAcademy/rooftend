import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswersService } from './services/answers.service';
import { AnswersController } from './controllers/answers.controller';


@Module({
  providers: [AnswersService],
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswersController],
})
export class AnswersModule { }
