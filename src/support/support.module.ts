import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportController } from './controllers/support.controller';
import { SupportCategory } from './entities/supportCategory.entity';
import { SupportQuestion } from './entities/supportQuestion.entity';
import { SupportRequest } from './entities/supportRequest.entity';
import { SupportService } from './services/support.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SupportCategory,
      SupportQuestion,
      SupportRequest,
    ]),
  ],
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
