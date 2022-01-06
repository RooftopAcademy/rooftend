import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateUserDTO } from '../entities/create-user-dto.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepo, options);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOneById(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne(email);
  }

  async create(user: CreateUserDTO) {
    const newUser: User = await this.userRepo.create(user);
    return await this.userRepo.save(newUser);
  }

  async update(id: number, body: any): Promise<User> {
    const user = await this.userRepo.findOne(id);
    this.userRepo.merge(user, body);
    return this.userRepo.save(user);
  }

  delete(id: number) {
    return this.userRepo.softDelete(id);
  }
}
