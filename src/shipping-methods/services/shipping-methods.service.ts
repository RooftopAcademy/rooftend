import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShippingMethod } from '../entities/shipping-method.entity';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethod)
    private shippingMethodsRepo: Repository<ShippingMethod>,
  ) {}

  findAll() {
    return this.shippingMethodsRepo.find();
  }

  async findOne(id: number) {
    const shippingMethod: ShippingMethod = await this.shippingMethodsRepo.findOne(id);

    if (!shippingMethod) throw new NotFoundException();

    return shippingMethod;
  }

  getCount() {
    return this.shippingMethodsRepo.count();
  }
}
