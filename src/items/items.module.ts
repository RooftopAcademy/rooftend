import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../auth/casl/casl.module';
import { Brand } from '../brands/entities/brands.entity';
import { BrandsService } from '../brands/services/brands.serveces';
import { Category } from '../categories/entities/categories.entity';
import { CategoriesService } from '../categories/services/categories.service';
import { ItemsController } from './controllers/items.controller';
import { Item } from './entities/items.entity';
import { ItemsService } from './services/items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [TypeOrmModule.forFeature(
    [Item, Category, Brand]),
    CaslModule,
    CategoriesService,
    BrandsService,
  ],
})
export class ItemsModule {}
