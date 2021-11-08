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
    return `Phone with id: ${phone.id}`;
  }

  update(id: number, phone: any): string {
    return `Update phone with id: ${id}`;
  }

  delete(id: number): string {
    return `Delete phone with id: ${id}`;
  }
}
