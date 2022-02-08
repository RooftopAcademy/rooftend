import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from '../entities/create-user-dto.entity';
import { EditPasswordDTO } from '../entities/edit-password-dto.entity';
import { AccountStatusesEnum } from '../../account-status/models/AccountStatusesEnum';
import { EmailChange } from '../entities/email-change.entity';
import { EmailChangeDTO } from '../entities/change-email.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { cryptoConstants } from '../../mail/constants/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(EmailChange)
    private emailChangeRepo: Repository<EmailChange>,
    private eventEmitter: EventEmitter2,
  ) {}

  async returnLoggedUser(id: number): Promise<Partial<User>> {
    return await this.userRepo.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ email });
  }

  async findPassword(id: number): Promise<string> {
    const foundUser = await this.userRepo.findOne(id, { select: ['password'] });
    return foundUser.password;
  }

  async findAccountStatus(id: number): Promise<AccountStatusesEnum> {
    const foundUser = await this.userRepo.findOne(id, {
      select: ['account_status'],
    });
    return foundUser.account_status;
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({ username });
  }

  async create(user: CreateUserDTO) {
    const newUser: User = await this.userRepo.create(user);

    return await this.userRepo.save(newUser);
  }

  async updateEmail(
    user: User,
    newEmail: string,
  ): Promise<{ message: string }> {
    const newEmailChange: EmailChange = this.emailChangeRepo.create({
      userId: user.id,
      oldEmail: user.email,
      newEmail: newEmail,
    });

    const emailChangeFromDB = await this.emailChangeRepo.save(newEmailChange);

    this.eventEmitter.emit(
      'email.change-confirmation',
      user,
      emailChangeFromDB.authorizationId,
    );

    return { message: 'Please, confirm your email' };
  }

  async canChangeEmail(user: User) {
    // const sixMonthsInMs = 15724800800;
    const sixMonthsInMs = 5000;

    const changeEmailRegister = await this.emailChangeRepo.findOne({
      where: {
        userId: user.id,
      },
      order: { createdAt: 'DESC' },
    });

    /**
     * Checks if user changed email and if changed checks how long has it been since then
     * If it has been less than 6 months, it rejects the change email request
     */

    if (changeEmailRegister) {
      const timeElapsed =
        changeEmailRegister.updatedAt.getTime() -
        changeEmailRegister.createdAt.getTime();

      if (timeElapsed < sixMonthsInMs) {
        throw new HttpException(
          'You can change your email once every six months',
          HttpStatus.CONFLICT,
        );
      }
    } else {
      const userCreatedAtObj = await this.userRepo.findOne(
        { id: user.id },
        {
          select: ['createdAt'],
        },
      );

      const timeElapsed = Date.now() - userCreatedAtObj.createdAt.getTime();

      if (timeElapsed < sixMonthsInMs) {
        throw new HttpException(
          'You can change your email after 6 months of creating your account',
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  async checkEmailChangeByAuthId(authorizationId: string) {
    /**
     * Checks if a table exists under the authorization id sent
     */

    const emailChangeRegister = await this.emailChangeRepo.findOne(
      authorizationId,
    );

    if (!emailChangeRegister) {
      throw new HttpException('AUTHORIZATION_ID_NOT_VALID', 490);
    }

    /**
     * Checks if the authorization id sent is still valid
     */

    const timeElapsed = Date.now() - emailChangeRegister.createdAt.getTime();
    if (timeElapsed > cryptoConstants.VALIDITY_TIME) {
      throw new HttpException('AUTHORIZATION_ID_EXPIRED', HttpStatus.NOT_FOUND);
    }

    return emailChangeRegister;
  }

  async confirmEmailChange(user: User, emailChangeRegister: EmailChange) {
    /**
     * Update of user and email change registers
     */

    this.emailChangeRepo.update(
      { userId: user.id },
      { newEmail: emailChangeRegister.newEmail },
    );

    this.userRepo.update(
      { id: user.id },
      { email: emailChangeRegister.newEmail },
    );
  }

  async updateUsername(
    id: number,
    username: string,
  ): Promise<{ message: string }> {
    this.userRepo.update({ id: id }, { username: username });

    return { message: 'Username modified, please login again' };
  }

  async validateCurrentPassword(user: User, currentPassword: string) {
    const foundUser = await this.findOneByEmail(user.email);

    return await bcrypt.compare(currentPassword, foundUser.password);
  }

  async updatePassword(id: number, editPasswordDTO: EditPasswordDTO) {
    const user = await this.returnLoggedUser(id);

    user.password = await bcrypt.hash(editPasswordDTO.newPassword, 10);

    this.userRepo.save(user);

    return { message: 'Password updated, please login again' };
  }

  async updateAccountStatus(user: User) {
    this.userRepo.update(
      { id: user.id },
      { account_status: user.account_status },
    );
  }

  async delete(id: number) {
    this.userRepo.softDelete(id);

    const user = await this.userRepo.findOne(id);

    user.account_status = AccountStatusesEnum.INACTIVE;

    this.userRepo.save(user);

    return { message: 'User deleted' };
  }
}
