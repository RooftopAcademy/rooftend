/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentMethod from '../payment-method.entity';

@Injectable()
export default class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly repository: Repository<PaymentMethod>,
  ) {}

  all(): Promise<PaymentMethod[]> {
    return this.repository.find();
  }

  find(id: number): Promise<PaymentMethod> {
    return this.repository.findOne(id);
  }
}
