import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { LogInUserDTO } from '../../users/entities/log-in-user-dto.entity';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../../users/entities/user.entity';

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
    this.eventEmitter.emit('user.created', newUser);
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email.toLowerCase());

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async validatePassword(user: User, password): Promise<any> {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registry(user: LogInUserDTO | CreateUserDTO) {
    const foundUser = await this.validateUser(user.email);

    const { password, ...result } = foundUser;

    return {
      accessToken: this.jwtService.sign(result),
    };
  }

  async login(user: LogInUserDTO | CreateUserDTO) {
    const foundUser = await this.validateUser(user.email);

    const passwordValidation = await this.validatePassword(
      foundUser,
      user.password,
    );

    if (!passwordValidation) {
      throw new HttpException('WRONG_PASSWORD', HttpStatus.FORBIDDEN);
    }

    const { password, ...result } = foundUser;

    return {
      accessToken: this.jwtService.sign(result),
    };
  }
}
