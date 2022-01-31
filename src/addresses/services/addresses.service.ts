import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

  public async findOne(id: number): Promise<Address> {
    const address = await this.addressRepo.findOne(id, {
      relations: ['user'],
    });

    return address;
  }

  update(address: Address, body): Promise<UpdateResult> {
    return this.addressRepo.update(address, body);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.addressRepo.delete(id);
  }

  create(body: CreateAddressDto): string {
    return 'item created';
  }
}
