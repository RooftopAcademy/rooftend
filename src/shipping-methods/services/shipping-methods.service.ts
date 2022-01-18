import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShippingMethod } from '../entities/shipping-method.entity';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodsRepo: Repository<ShippingMethod>,
  ) { }

  findAll(): Promise<ShippingMethod[]> {
    return this.shippingMethodsRepo.find();
  }
}
