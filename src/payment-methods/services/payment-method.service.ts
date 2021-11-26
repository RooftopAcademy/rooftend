/* eslint-disable prettier/prettier */
import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentMethod from '../payment-method.entity';
import { PaymentMethodDto } from '../dto/create-payment-method.dto';

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

  create(@Body() body: PaymentMethodDto): Promise<PaymentMethod> {
    const paymentMethod = this.repository.create(body);

    return this.repository.save(paymentMethod);
  }

  async update(id: number, body: PaymentMethodDto): Promise<PaymentMethod> {
    const paymentMethod = await this.find(id);
    this.repository.merge(paymentMethod, body);
    return this.repository.save(paymentMethod);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
