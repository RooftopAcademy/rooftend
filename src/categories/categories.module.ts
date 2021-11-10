import { Module } from '@nestjs/common';
import { CategoriesService } from './categories/services/categories.service';
import { CategoriesController } from './categories/controllers/categories.controller';
import {Category} from './categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    TypeOrmModule.forFeature([Category]),
  ]
})
export class CategoriesModule {}
