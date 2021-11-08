/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import paymentMethodInterface from './paymentMethodInterface.interface';

@Injectable()
export class PaymentMethodsService {

    private readonly paymentMethods: paymentMethodInterface

}

// retornar ejemplo como si fuera la base de datos