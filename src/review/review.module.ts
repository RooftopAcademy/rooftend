import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './controllers/review.controller';
import { ReviewRepository } from './repositories/review.repository';
import { Review } from './review.entity';
import { ReviewService } from './services/review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [TypeOrmModule.forFeature([Review, ReviewRepository])],
})
export class ReviewModule {}
