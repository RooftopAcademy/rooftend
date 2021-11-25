/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';

import { AccountStatusModule } from './account-status/account-status.module';
import { BrandsModule } from './brands/brands.module';
import { FavoritesModule } from './favorites/favorites.module';
import { HistoryModule } from './history/history.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentMethodsModule } from './payment-methods/payment-method.module';
import { PhonesModule } from './phones/phones.module';
import { PhotosModule } from './photos/photos.module';
import { PlatformModule } from './platform/platform.module';
import { ProfileModule } from './profile/profile.module';
import { ReviewModule } from './review/review.module';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_HOST),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),

    AccountStatusModule,    
    BrandsModule,
    FavoritesModule,
    HistoryModule,
    NotificationModule,
    PaymentMethodsModule,
    PhonesModule,
    PhotosModule,
    PlatformModule,
    ProfileModule,
    QuestionsModule,
    ReviewModule,
    ShippingMethodsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
