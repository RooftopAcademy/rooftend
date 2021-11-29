/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PaymentMethodsController from './controllers/payment-method.controller';
import PaymentMethod from './payment-method.entity';
import PaymentMethodsService from './services/payment-method.service';

@Module({
  providers: [PaymentMethodsService],
  controllers: [PaymentMethodsController],
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
})
export class PaymentMethdosModule {}
