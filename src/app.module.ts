import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './favorites/favorites.module';

import { ProfileModule } from './profile/profile.module';
import { ProfilesController } from './profile/controllers/profiles.controller';
import { ProfileService } from './profile/services/profile/profile.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      // synchronize: true,
    }),
    ProfileModule,
    FavoritesModule,
  ],
  controllers: [AppController, ProfilesController],
  providers: [AppService, ProfileService],
})
export class AppModule {}
