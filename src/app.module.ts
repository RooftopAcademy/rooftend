/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentMethodsController } from './paymentMethod.controller';
import { PaymentMethodsService } from './paymentMethod.service';

@Module({
  imports: [],
  controllers: [AppController, PaymentMethodsController],
  providers: [AppService, PaymentMethodsService],
})
export class AppModule {}
