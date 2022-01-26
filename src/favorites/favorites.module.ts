import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Favorite } from './entities/favorite.entity';
import { CaslModule } from '../auth/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), CaslModule],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
