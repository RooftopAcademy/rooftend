import { Injectable } from '@nestjs/common';

@Injectable()
export class PhonesService {
  findAll(): string {
    return 'Phones list';
  }

  findOne(id: number): string {
    return `Phone with id: ${id}`;
  }

  create(phone: any): string {
    return `Create phone with id: ${phone.id}`;
  }

  update(id: number, phone: any): string {
    return `Update phone with id: ${id} and ${phone}`;
  }

  delete(id: number): string {
    return `Delete phone with id: ${id}`;
  }
}
