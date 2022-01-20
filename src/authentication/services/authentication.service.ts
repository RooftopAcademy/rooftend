import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../../users/entities/user.entity';
import { MailService } from '../../mail/services/mail.service';
import { createDecipheriv } from 'crypto';
import { CryptoSecurityKey } from '../../mail/constants/constants';
import { AccountStatusesEnum } from '../../account-status/models/AccountStatusesEnum';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
    private mailService: MailService,
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
    // if (user.account_status != AccountStatusesEnum.ACTIVE) {
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

  async confirmRegistry(transaction: string) {
    
    const decipher = createDecipheriv(CryptoSecurityKey.algorithm, CryptoSecurityKey.key, CryptoSecurityKey.initialVector);

    let decryptedData = decipher.update(transaction, CryptoSecurityKey.outputEncoding, CryptoSecurityKey.inputEncoding);

    decryptedData += decipher.final("utf8");

    const transactionInfo = JSON.parse(decryptedData);

    const user = await this.usersService.findOneByEmail(transactionInfo.email);

    const maxHours = 1000 * 60 * 60 * 24;
    
    const timeElapsed = Date.now() - transactionInfo.date
    const transactionExpired = timeElapsed > maxHours;

    if(transactionExpired) {
      throw new HttpException('TRANSACTION_EXPIRED', HttpStatus.FORBIDDEN)
    } 

    if(user.account_status == AccountStatusesEnum.ACTIVE) {
      throw new HttpException('USER_IS_ALREADY_ACTIVE', HttpStatus.CONFLICT);
    }
    if(user.account_status == AccountStatusesEnum.BLOCKED || user.account_status == AccountStatusesEnum.INACTIVE) {
      throw new HttpException('USER_IS_INACTIVE_OR_BLOCKED', HttpStatus.FORBIDDEN);
    }

    user.account_status = AccountStatusesEnum.ACTIVE;

    

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

  async signUp(user: User) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    // create user in db
    // ...
    // send confirmation mail
    // await this.mailService.sendUserConfirmation(user, token);
  }

}
