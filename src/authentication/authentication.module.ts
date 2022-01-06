import { Module } from '@nestjs/common';
import { UserService } from '../users/services/user.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService],
})
export class AuthenticationModule {}
