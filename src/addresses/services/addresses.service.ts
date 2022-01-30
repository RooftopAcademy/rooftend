import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { CreateAddressDto } from '../entities/create.address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {  }

  findAll(): [] {
    return [];
  }

  public async findOne(id: string): Promise<Address> {
    const address = await this.addressRepo.findOne(id, {
      relations: ['user'],
    });

    return address;
  }

  edit(id: string): string {
    return `item ${id} edited`;
  }

  delete(id: string): string {
    return `item ${id} removed`;
  }

  create(body: CreateAddressDto): string {
    return 'item created';
  }
}
