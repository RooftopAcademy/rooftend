/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './paymentMethod.controller';
import { PaymentMethodsService } from './paymentMethod.service';

@Module({
    providers: [PaymentMethodsService],
    controllers: [PaymentMethodsController],
    imports: []
})

export class PaymentMethdosModule {}
