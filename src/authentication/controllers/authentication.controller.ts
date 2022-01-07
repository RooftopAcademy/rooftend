import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('register')
  async register(@Body() user: CreateUserDTO) {
    this.authService.checkEmail(user);

    //verificar max, min caracteres y alfanumerico y simbolos (regExp)

    //en las columnas de las tablas se permiten nulos????

    this.authService.create(user);

    //crear evento para crear carrito

    //implementar passport y devolver token

    //id, mail, password

    return 'retornar token';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
