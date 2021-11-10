/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PaymentMethodsController from './controllers/paymentMethod.controller';
import PaymentMethod from './paymentMethod.entity';
import PaymentMethodsService from './services/paymentMethod.service';

@Module({
    providers: [PaymentMethodsService],
    controllers: [PaymentMethodsController],
    imports: [
        TypeOrmModule.forFeature([PaymentMethod])
    ]
})

export class PaymentMethdosModule {}
