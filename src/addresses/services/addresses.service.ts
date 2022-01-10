import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class AddressesService {

  constructor(@InjectRepository(Address) private adressRepo: Repository<Address>) {

  }

  async findOne(idAddress: number): Promise<Address> {
    const address = getConnection().createQueryBuilder()
      .select(["address.country_code", "address.country_state",
        "address.city_name", "address.street_name", "address.street_number",
        "address.zip_code", "address.floor", "address.office"])
      .from(Address, "address")
      .where("address.id = :id", { id: idAddress });

    return address[0];
  }

  async update(id: number, body: any): Promise<Address> {
    const address = await this.adressRepo.findOne(id);
    this.adressRepo.merge(address, body);
    return this.adressRepo.save(address);
  }

  create(body: any) {
    const newAddress = this.adressRepo.create(body);
    return this.adressRepo.save(newAddress);
}
}
