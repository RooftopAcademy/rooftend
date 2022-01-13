import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShippingMethod } from '../entities/shipping-method.entity';
import { ShippingMethodDTO } from '../dto/shipping-method.dto';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethod)
<<<<<<< HEAD
    private readonly shippingMethodsRepo: Repository<ShippingMethod>,
  ) { }

  findAll(): Promise<ShippingMethodDTO[]> {
    return this.shippingMethodsRepo.find();
=======
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
>>>>>>> c3beef905c1580e32126b2865ed80567b7bb5ada
  }
}
