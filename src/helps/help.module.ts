import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpController } from './controllers/help.controller';
import { HelpService } from './services/help.service';
import { Help } from './help.entity';
import { Question } from '../questions/entities/question.entity';
import { Category } from '../categories/categories.entity';

@Module({

  controllers: [HelpController],
  providers: [HelpService],
  imports: [TypeOrmModule.forFeature([Help, Question, Category])],
})
export class HelpsModule { }
