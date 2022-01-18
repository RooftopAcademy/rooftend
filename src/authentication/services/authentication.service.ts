import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
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

  async create(user: CreateUserDTO): Promise<User> {
    user.email = user.email.toLowerCase();
    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await this.usersService.create(user);

    this.eventEmitter.emit('user.created', newUser);

    return newUser;
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email.toLowerCase());

    // ésto se debe implementar cuando hayamos creado los emails de autenticacion
    // if (
    //   (await this.usersService.findAccountStatus(user.id)) !=
    //   AccountStatusesEnum.ACTIVE
    // ) {
    //   throw new HttpException('USER_NOT_ACTIVE', HttpStatus.NOT_FOUND);
    // }

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async validatePassword(dbPassword, password): Promise<any> {
    const passwordMatch = await bcrypt.compare(password, dbPassword);

    if (!passwordMatch) {
      throw new HttpException('WRONG_PASSWORD', HttpStatus.FORBIDDEN);
    }
  }

  async registry(user: User) {
    return {
      accessToken: this.jwtService.sign({ ...user }),
    };
  }

  async login(user: User, receivedPassword: string) {
    const dbPassword = await this.usersService.findPassword(user.id);

    await this.validatePassword(dbPassword, receivedPassword);

    return {
      accessToken: this.jwtService.sign({ ...user }),
    };
  }
}
