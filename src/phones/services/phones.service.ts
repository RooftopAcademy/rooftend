import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Phone } from '../entities/phone.entity';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
  ) {}

  findAll(): Promise<Phone[]> {
    return this.phoneRepository.find();
  }

  findOne(id: number): Promise<Phone> {
    return this.phoneRepository.findOne(id);
  }

  create(phone: any): Promise<Phone> {
    return this.phoneRepository.save(phone);
  }

  async update(id: number, phoneChanges: any): Promise<String> {
    try {
      const phone = await this.phoneRepository.findOne(id);
      this.phoneRepository.merge(phone, phoneChanges);
      this.phoneRepository.save(phone);
      return 'Phone updated';
    } catch (e) {
      return 'Phone not found id: ' + id;
    }
  }

  async delete(id: number): Promise<String> {
    try {
      await this.phoneRepository.delete(id);
      return 'Phone deleted';
    } catch (e) {
      return 'Phone not found';
    }
  }
}
