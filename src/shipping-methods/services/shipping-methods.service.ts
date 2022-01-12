import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShippingMethod } from '../entities/shipping-method.entity';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethod) private shippingMethodsRepo: Repository<ShippingMethod>
  ) { }

  findAll() {
    return this.shippingMethodsRepo.find();
  }

  findOne(id: number) {
    return this.shippingMethodsRepo.findOne(id);
  }
}
