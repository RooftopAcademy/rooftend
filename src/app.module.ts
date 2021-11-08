import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
