import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShippingMethod } from '../shipping-method.entity';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethod) private shippingMethodsRepo: Repository<ShippingMethod>
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

  create(body: any) {
    // const newShippingMethod = new ShippingMethod();
    // newShippingMethod.name = body.name;
    // newShippingMethod.photoId = body.photoId;

    // return this.shippingMethodsRepo.save(newShippingMethod);
    return 'Método de Envío Creado';
  }

  async update(id: number, body: any) {
    //const shippingMethod = await this.findOne(id);
    //this.shippingMethodsRepo.merge(shippingMethod, body);
    //return this.shippingMethodsRepo.save(shippingMethod);
    return `Se Actualizó el Método de Envío ${id}`;
  }

  async delete(id: number) {
    //await this.shippingMethodsRepo.delete(id);
    return 'Eliminado';
  }
}
