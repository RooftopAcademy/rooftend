import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async checkEmail(user: CreateUserDTO) {
    const userExists = await this.usersService.findOneByEmail(
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
    await this.usersService.create(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email.toLowerCase());

    const passwordMatch = await bcrypt.compare(pass, user.password);

    if (user && passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
