import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';

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
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      username : process.env.DB_USER,
=======
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
>>>>>>> f376865ffcad4e664fe333cf70c23d2e5e3c3f6a
      password: process.env.DB_PASS,
      database : process.env.DB_NAME,
      autoLoadEntities : true,
      // synchronize: true,
    }),
<<<<<<< HEAD
    CategoriesModule],
=======

    AccountStatusModule,
    FavoritesModule,
    NotificationModule,
    PlatformModule,
    ProfileModule,
    ReviewModule,
    ShippingMethodsModule,
    UsersModule,
  ],
>>>>>>> f376865ffcad4e664fe333cf70c23d2e5e3c3f6a
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
