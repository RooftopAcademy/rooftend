import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
=======
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
>>>>>>> 7691872 (Add profile module)
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoryModule } from './history/history.module';
import { ProfileModule } from './profile/profile.module';


import { AccountStatusModule } from './account-status/account-status.module';
import { FavoritesModule } from './favorites/favorites.module';
import { NotificationModule } from './notification/notification.module';
import { PlatformModule } from './platform/platform.module';
import { ProfileModule } from './profile/profile.module';
import { ReviewModule } from './review/review.module';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
<<<<<<< HEAD
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database : process.env.DB_NAME,
      autoLoadEntities : true,
      // synchronize: true,
    }),

    AccountStatusModule,
    FavoritesModule,
    NotificationModule,
    PlatformModule,
    ProfileModule,
    ReviewModule,
    ShippingMethodsModule,
    UsersModule,
=======
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type : 'postgres',
      host : process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      username : process.env.DB_USER,
      password: process.env.DB_PASS,
      database : process.env.DB_NAME,
      //autoLoadEntities : true,
      // synchronize: true,
    }),
    HistoryModule, ProfileModule
>>>>>>> 7691872 (Add profile module)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
