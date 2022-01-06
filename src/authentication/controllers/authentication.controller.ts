import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { AuthenticationService } from '../services/authentication.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const userExists = await this.authService.findUserByEmail(body.email);

    if (userExists) {
      throw new HttpException(
        'The user is already registered',
        HttpStatus.CONFLICT,
      );
    }

    //verificar max, min caracteres y alfanumerico y simbolos (regExp)

    //en las columnas de las tablas se permiten nulos????

    const newUser = new User();
    newUser.email = body.email.toLocaleLowerCase();
    newUser.password = await bcrypt.hash(body.password, 10);

    console.log(newUser);

    //////////

    this.authService.addUserToDatabase(newUser);

    return 'hola pepe';
  }
}
