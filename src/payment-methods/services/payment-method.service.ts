import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentMethod from '../models/payment-method.entity';

@Injectable()
export default class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentRepository: Repository<PaymentMethod>,
  ) {}

  getAll() {
    const payments = this.paymentRepository.createQueryBuilder('payment')
    .select(['payment.name', 'payment.type'])
    .getMany()
    return payments
  }

  findOne(id: number){
    const payment = this.paymentRepository.createQueryBuilder('payment')
    .select(['payment.name', 'payment.type'])
    .where('payment.id = :id',{id: id})
    .getOne()
    return payment
  }
}
