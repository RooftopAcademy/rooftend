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

    if (
      (await this.usersService.findAccountStatus(user.id)) !=
      AccountStatusesEnum.ACTIVE
    ) {
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

  async confirmRegistry(transactionToken: string) {
    /**
     * Decrypt of transaction data
     */

    let transactionTokenInfo;

    try {
      const decipher = createDecipheriv(
        cryptoConstants.ALGORITHM,
        cryptoConstants.KEY,
        cryptoConstants.INITIAL_VECTOR,
      );
      let decryptedData = decipher.update(
        transactionToken,
        cryptoConstants.OUTPUT_ENCODING,
        cryptoConstants.INPUT_ENCODING,
      );
      decryptedData += decipher.final('utf8');
      transactionTokenInfo = JSON.parse(decryptedData);
    } catch {
      throw new HttpException('TRANSACTION_TOKEN_NOT_VALID', 490);
    }

    /**
     * Check of transaction validity
     */

    const timeElapsed = Date.now() - transactionTokenInfo.date;
    if (timeElapsed > cryptoConstants.VALIDITY_TIME) {
      throw new HttpException(
        'TRANSACTION_TOKEN_EXPIRED',
        HttpStatus.NOT_FOUND,
      );
    }

    /**
     * Check account status of registered user
     */

    const user = await this.usersService.findOneByEmail(
      transactionTokenInfo.email,
    );

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    user.account_status = await this.usersService.findAccountStatus(user.id);

    if (user.account_status == AccountStatusesEnum.ACTIVE) {
      throw new HttpException('USER_IS_ALREADY_ACTIVE', HttpStatus.CONFLICT);
    }
    if (
      user.account_status == AccountStatusesEnum.BLOCKED ||
      user.account_status == AccountStatusesEnum.INACTIVE
    ) {
      throw new HttpException(
        'USER_IS_INACTIVE_OR_BLOCKED',
        HttpStatus.FORBIDDEN,
      );
    }

    /**
     * Update of user and token generation
     */
    user.account_status = AccountStatusesEnum.ACTIVE;
    this.usersService.updateAccountStatus(user);

    this.eventEmitter.emit('user.confirmed', user);

    const { account_status, ...result } = user;

    return {
      accessToken: this.jwtService.sign(result),
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
