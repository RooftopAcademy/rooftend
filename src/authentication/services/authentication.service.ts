import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../../users/entities/user.entity';
import { createDecipheriv } from 'crypto';
import { cryptoConstants } from '../../mail/constants/constants';
import { AccountStatusesEnum } from '../../account-status/models/AccountStatusesEnum';

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
        'USER_IS_ALREADY_REGISTERED',
        HttpStatus.CONFLICT,
      );
    }
  }

  async create(user: CreateUserDTO): Promise<void> {
    user.email = user.email.toLowerCase();
    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await this.usersService.create(user);

    this.eventEmitter.emit('user.created', newUser);
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email.toLowerCase());

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (user.account_status != AccountStatusesEnum.ACTIVE) {
      throw new HttpException('USER_NOT_ACTIVE', HttpStatus.NOT_FOUND);
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

    /**
     * Decrypt of transaction data
     */

    const decipher = createDecipheriv(cryptoConstants.ALGORITHM, cryptoConstants.KEY, cryptoConstants.INITIAL_VECTOR);
    let decryptedData = decipher.update(transaction, cryptoConstants.OUTPUT_ENCODING, cryptoConstants.INPUT_ENCODING);
    decryptedData += decipher.final("utf8");
    const transactionInfo = JSON.parse(decryptedData);

    /**
     * Check of transaction validity
     */

    const timeElapsed = Date.now() - transactionInfo.date
    if(timeElapsed > cryptoConstants.VALIDITY_TIME) {
      throw new HttpException('TRANSACTION_EXPIRED', HttpStatus.FORBIDDEN)
    }

    /**
     * Check account status of registered user
     */

    const user = await this.usersService.findOneByEmail(transactionInfo.email);
    if(user.account_status == AccountStatusesEnum.ACTIVE) {
      throw new HttpException('USER_IS_ALREADY_ACTIVE', HttpStatus.CONFLICT);
    }
    if(user.account_status == AccountStatusesEnum.BLOCKED || user.account_status == AccountStatusesEnum.INACTIVE) {
      throw new HttpException('USER_IS_INACTIVE_OR_BLOCKED', HttpStatus.FORBIDDEN);
    }

    /**
     * Update of user and token generation
     */
    user.account_status = AccountStatusesEnum.ACTIVE;
    this.usersService.updateAccountStatus(user);

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
