import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressesService {
  findAll(): [] {
    return [];
  }

  public find(id: string): string {
    return `item ${id} found`;
  }

  edit(id: string): string {
    return `item ${id} edited`;
  }

  delete(id: string): string {
    return `item ${id} removed`;
  }

  create(body: Body): string {
    return 'item created';
  }
}
