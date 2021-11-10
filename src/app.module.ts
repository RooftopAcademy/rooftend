/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentMethdosModule } from './paymentMethods/paymentMethod.module';
import { ProfileModule } from './profile/profile.module';

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
    ProfileModule, PaymentMethdosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
