import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { User } from '../../users/entities/user.entity';
import { createCipheriv } from 'crypto';
import { cryptoConstants } from '../constants/constants';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string) {
    /**
     * Data encryption
     */

    const cipher = createCipheriv(
      cryptoConstants.ALGORITHM,
      cryptoConstants.KEY,
      cryptoConstants.INITIAL_VECTOR,
    );
    const obj = { email, date: Date.now() };
    let transactionToken = cipher.update(
      JSON.stringify(obj),
      cryptoConstants.INPUT_ENCODING,
      cryptoConstants.OUTPUT_ENCODING,
    );
    transactionToken += cipher.final('hex');

    /**
     * Sending the email
     */

    const url = `example.com/auth/confirm?transaction-token=${transactionToken}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Roofstore! Please, confirm your email',
      template: '../registry-confirmation',
      context: {
        url,
      },
    });
  }

  async sendEmailConfirmation(user: User, authorizationId: string) {
    const url = `example.com/user/email-change?authorization-id=${authorizationId}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Email change confirmation',
      template: '../mail-change-confirmation',
      context: {
        url,
        name: user.username,
      },
    });
  }

  @OnEvent('user.created')
  handleUserCreatedEvent(user: User) {
    this.sendUserConfirmation(user.email);
  }

  @OnEvent('email.change-confirmation')
  handleEmailConfirmation(user: User, authorizationId: string) {
    this.sendEmailConfirmation(user, authorizationId);
  }
}
