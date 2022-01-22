import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemReviewsController } from './controllers/itemReviews.controller';

import { ItemReviewsService } from './services/itemReviews.service';
import { CartModule } from '../cart/cart.module';
import { UserReviews } from './entities/userReviews.entity';
import { ItemReviews } from './entities/itemReviews.entity';
import { UserReviewsService } from './services/userReviews.service';
import { CaslModule } from '../auth/casl/casl.module';
import { UserReviewsController } from './controllers/userReviews.controller';
import { ItemsModule } from '../items/items.module';
import { ItemsService } from '../items/services/items.service';
import { Item } from '../items/entities/items.entity';

@Module({
  controllers: [ItemReviewsController, UserReviewsController],
  providers: [ItemReviewsService, UserReviewsService, ItemsService],
  imports: [TypeOrmModule.forFeature([UserReviews, ItemReviews, Item]), CartModule, CaslModule, ItemsModule],
})
export class ReviewModule { }
