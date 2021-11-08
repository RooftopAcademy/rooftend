/* eslint-disable prettier/prettier */
import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentMethod from './paymentMethod.entity';

@Injectable()
export class PaymentMethodsService {

    constructor(
      @InjectRepository(PaymentMethod) private paymentMethodRepository: Repository<PaymentMethod>,
    ) {}

    private readonly paymentMethods: PaymentMethod[] = 
      [
        {id: 1, name: 'CASH', type: 'CASH'},
        {id: 2, name: 'ATM', type: 'ATM'},
        {id: 3, name: 'DEBIT_CARD', type: 'DEBIT_CARD'},
        {id: 4, name: 'CREDIT_CARD', type: 'CREDIT_CARD'}
      ];

    getAll() : PaymentMethod[] {
        return this.paymentMethods;
    }

    getById(id : number) : Promise<PaymentMethod> {
        return this.paymentMethodRepository.findOne(id);
    }

    create(@Body() paymentMethod: PaymentMethod) : void {
        this.paymentMethods.push(paymentMethod);
        return 
    }

    async update(id: number, body: PaymentMethod) : Promise<PaymentMethod> {
      const paymentMethod = await this.getById(id);
      this.paymentMethodRepository.merge(paymentMethod, body);
      return this.paymentMethodRepository.save(paymentMethod);
    }

    async delete(id: number) : Promise<void> {
      await this.paymentMethodRepository.delete(id);
    }
}
