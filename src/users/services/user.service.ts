import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from '../entities/create-user-dto.entity';
import { EditPasswordDTO } from '../entities/edit-password-dto.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  returnLoggedUser(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ email });
  }

  async create(user: CreateUserDTO) {
    const newUser: User = await this.userRepo.create(user);
    return await this.userRepo.save(newUser);
  }

  async update(id: number, body: any): Promise<{ message: string; }> {
    const user = await this.userRepo.findOne(id);
    this.userRepo.merge(user, body);
    this.userRepo.save(user);
    return { message: 'Data modified' };
  }

  async validateCurrentPassword(user: User, currentPassword: string) {
    const foundUser = await this.findOneByEmail(user.email);

    return await bcrypt.compare(currentPassword, foundUser.password);
  }

  async updatePassword(id: number, editPasswordDTO: EditPasswordDTO) {
    
    const user = await this.returnLoggedUser(id);
    user.password = await bcrypt.hash(editPasswordDTO.newPassword, 10);
    this.userRepo.save(user);
    return editPasswordDTO;
  }

  delete(id: number) {
    return this.userRepo.softDelete(id);
  }
}
