import { Module } from '@nestjs/common';
import { CategoriesService } from './categories/services/categories.service';
import { CategoriesController } from './categories/controllers/categories.controller';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
