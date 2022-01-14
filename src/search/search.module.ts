import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../items/entities/items.entity';
import { User } from '../users/entities/user.entity';
import { SearchController } from './controllers/search.controller';
import { Search } from './entities/search.entity';
import { SearchService } from './services/search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [TypeOrmModule.forFeature([Search, Item, User])],
})
export class SearchModule { }
