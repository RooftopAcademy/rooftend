import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../../users/services/user.service';
import { CreateUserDTO } from '../entities/create-user-dto.entity';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('register')
  async register(@Body() user: CreateUserDTO) {
    this.authService.checkEmail(user);

    //verificar max, min caracteres y alfanumerico y simbolos (regExp)

    //en las columnas de las tablas se permiten nulos????

    this.authService.create(user);

    return 'retornar token';
  }
}
