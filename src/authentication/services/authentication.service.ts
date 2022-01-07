import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {}

  async checkEmail(user: CreateUserDTO) {
    const userExists = await this.userService.findOneByEmail(
      user.email.toLowerCase(),
    );

    if (userExists) {
      throw new HttpException(
        'The user is already registered',
        HttpStatus.CONFLICT,
      );
    }
  }

  async create(user: CreateUserDTO) {
    user.email = user.email.toLowerCase();
    user.password = await bcrypt.hash(user.password, 10);
    await this.userService.create(user);
  }
}
