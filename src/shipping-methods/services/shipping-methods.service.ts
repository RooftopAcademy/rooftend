import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ShippingMethod } from '../entities/shipping-method';

@Injectable()
export class ShippingMethodsService {
  // constructor(
  //   @InjectRepository(ShippingMethod) private shippingMethodsRepo: Repository<ShippingMethod>
  // ) {}

  findAll() {
    //return this.shippingMethodsRepo.find();
    return "Imagina que tienes muchos Métodos de Envío";
  }

  findOne(id: number) {
    //return this.shippingMethodsRepo.findOne(id);
    return "Imagina que tienes un Método de Envío";
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
    return "Método de Envío Creado";
  }

  async update(id: number, body:any) {
    //const shippingMethod = await this.findOne(id);
    //this.shippingMethodsRepo.merge(shippingMethod, body);
    //return this.shippingMethodsRepo.save(shippingMethod);
    return `Se Actualizó el Método de Envío ${id}`;
  }

  async delete(id: number) {
    //await this.shippingMethodsRepo.delete(id);
    return "Eliminado";
  }
}
