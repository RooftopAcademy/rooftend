import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AccountStatusModule } from './account-status/account-status.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { CaslModule } from './auth/casl/casl.module';
import { CustomMessagesModule } from './custom-messages/custom-messages.module';
import { ItemsModule } from './items/items.module';
import { BrandsModule } from './brands/brands.module';
import { CartModule } from './cart/cart.module';
import { CategoriesModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import { HistoryModule } from './history/history.module';
import { NotificationModule } from './notification/notification.module';
import { OffersModule } from './offers/offers.module';
import { PaymentMethodsModule } from './payment-methods/payment-method.module';
import { PhonesModule } from './phones/phones.module';
import { PhotosModule } from './photos/photos.module';
import { PlatformModule } from './platform/platform.module';
import { ProfileModule } from './profile/profile.module';
import { PurchasesModule } from './purchases/purchases.module';
import { QuestionsModule } from './questions/questions.module';
import { ReviewModule } from './review/review.module';
import { SearchModule } from './search/search.module';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';
import { StoresModule } from './stores/stores.module';
import { UsersModule } from './users/users.module';
import { SavedItemsModule } from './saved-items/saved-items.module';
import { SupportModule } from './support/support.module';

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
      //synchronize: true,
    }),

    AccountStatusModule,
    BrandsModule,
    CartItemModule,
    CartModule,
    CaslModule,
    CategoriesModule,
    CustomMessagesModule,
    FavoritesModule,
    HistoryModule,
    NotificationModule,
    ItemsModule,
    OffersModule,
    PaymentMethodsModule,
    PhonesModule,
    PhotosModule,
    PlatformModule,
    ProfileModule,
    PurchasesModule,
    QuestionsModule,
    ReviewModule,
    SavedItemsModule,
    SearchModule,
    ShippingMethodsModule,
    StoresModule,
    SupportModule,
    UsersModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
