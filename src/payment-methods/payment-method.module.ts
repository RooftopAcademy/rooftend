/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PaymentMethodsController from './controllers/paymentmethod.controller';
import PaymentMethod from './paymentmethod.entity';
import PaymentMethodsService from './services/paymentmethod.service';

@Module({
    providers: [PaymentMethodsService],
    controllers: [PaymentMethodsController],
    imports: [
        TypeOrmModule.forFeature([PaymentMethod])
    ]
})

export class PaymentMethdosModule {}
