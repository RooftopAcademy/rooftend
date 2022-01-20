import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { User } from '../../users/entities/user.entity';
import { createCipheriv } from 'crypto';
import { CryptoSecurityKey } from '../constants/constants';


@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
  ) { }

  async sendUserConfirmation(email: string) {

    const cipher = createCipheriv(CryptoSecurityKey.algorithm, CryptoSecurityKey.key, CryptoSecurityKey.initialVector);

    const obj = {email, date: Date.now() };

    let transaction = cipher.update(JSON.stringify(obj), CryptoSecurityKey.inputEncoding, CryptoSecurityKey.outputEncoding);

    transaction += cipher.final("hex");

    const url = `example.com/auth/confirm?transaction=${transaction}`;

    await this.mailerService.sendMail({
      to: email,
      // from: 'Support Team', // override default from
      subject: 'Welcome to Roofstore! Please, confirm your email',
      template: '../registry-confirmation',
      context: {
        url,
      },
    });
  }

  @OnEvent('user.created')
  handleUserCreatedEvent(user: User) {
    this.sendUserConfirmation(user.email);
  }

}
