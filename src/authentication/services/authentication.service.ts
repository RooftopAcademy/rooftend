import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../entities/create-user-dto.entity';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {}

  async checkEmail(user: CreateUserDTO) {
    const userExists = await this.userService.findOneByEmail(user.email);

    if (userExists) {
      throw new HttpException(
        'The user is already registered',
        HttpStatus.CONFLICT,
      );
    }
  }

  async create(user: CreateUserDTO) {
    user.email = user.email.toLocaleLowerCase();
    user.password = await bcrypt.hash(user.password, 10);

    const newUser = this.userService.create(user);
    await this.userService.save(newUser);
  }
}
