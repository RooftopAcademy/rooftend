import { Injectable } from '@nestjs/common';
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
    //return this.shippingMethodsRepo.find();
    return [
      {
        id: 1,
        name: '',
        photoId: 1,
      },
      {
        id: 2,
        name: '',
        photoId: 2,
      },
    ];
  }

  findOne(id: number) {
    //return this.shippingMethodsRepo.findOne(id);
    return {
      id: id,
      name: '',
      photoId: 1,
    };
  }

  getCount() {
    //return this.shippingMethodsRepo.query("SELECT COUNT(*) FROM shipping_methods");
    return 10;
  }
}
