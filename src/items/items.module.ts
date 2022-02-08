import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../auth/casl/casl.module';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';
import { ItemsController } from './controllers/items.controller';
import { Item } from './entities/items.entity';
import { ItemsService } from './services/items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [
    TypeOrmModule.forFeature([Item]),
    CaslModule,
    CategoriesModule,
    BrandsModule,
  ],
  exports: [ItemsService],
})

export class ItemsModule { }
