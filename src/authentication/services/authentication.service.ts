import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
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
    const newUser = await this.usersService.create(user);
    this.eventEmitter.emit('user-created', newUser.id);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email.toLowerCase());

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await bcrypt.compare(pass, user.password);

    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const foundUser = await this.usersService.findOneByEmail(
      user.email.toLowerCase(),
    );

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { password, ...result } = foundUser;

    return {
      accessToken: this.jwtService.sign(result),
    };
  }
}
