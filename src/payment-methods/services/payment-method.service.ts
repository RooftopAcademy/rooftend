import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentMethod from '../models/payment-method.entity';

@Injectable()
export default class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly repository: Repository<PaymentMethod>,
  ) {}

  getAll(): Promise<PaymentMethod[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<PaymentMethod> {
    return this.repository.findOne(id);
  }
}
