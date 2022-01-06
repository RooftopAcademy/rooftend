import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';

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
