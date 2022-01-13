import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Phone } from '../entities/phone.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

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

  async update(id: number, phoneChanges: any): Promise<Phone> {
    return this.phoneRepository.findOne(id).then((phone) => {
      if (phone) {
        this.phoneRepository.merge(phone, phoneChanges);
        this.phoneRepository.save(phone);
        return phone;
      }

      const error: HttpErrorMessage = { message: 'Not Found', code: 404 };

      return Promise.reject(error);
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.phoneRepository.delete(id);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Phone>> {
    return paginate<Phone>(this.phoneRepository, options);
  }
}
