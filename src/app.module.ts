/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { PaymentMethodsController } from './paymentMethod.controller';
import { PaymentMethodsService } from './paymentMethod.service';

@Module({
  imports: [PaymentMethdosModuleModule],
  controllers: [AppController, PaymentMethodsController],
  providers: [AppService, PaymentMethodsService],
=======
import { ProfileModule } from './profile/profile.module';
import { ProfilesController } from './profile/controllers/profiles.controller';
import {ProfileService} from './profile/services/profile/profile.service'
import { PaymentMethdosModuleModule } from './payment-methdos-module/payment-methdos-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type : 'postgres',
      host : process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      username : process.env.DB_USER,
      password: process.env.DB_PASS,
      database : process.env.DB_NAME,
      autoLoadEntities : true,
      // synchronize: true,
    }),
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 8fa7bfaef7fd2d45b87679e48a2f29927df654bd
})
export class AppModule {}
