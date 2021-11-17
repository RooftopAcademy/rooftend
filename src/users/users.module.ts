import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UsersModule {}
