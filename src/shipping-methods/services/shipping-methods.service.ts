import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShippingMethod } from '../entities/shipping-method.entity';
import { ShippingMethodDTO } from '../dto/shipping-method.dto';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodsRepo: Repository<ShippingMethod>,
  ) { }

  findAll(): Promise<ShippingMethodDTO[]> {
    return this.shippingMethodsRepo.find();
  }
}
