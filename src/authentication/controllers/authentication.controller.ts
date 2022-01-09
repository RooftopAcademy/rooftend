import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDTO) {
    await this.authService.checkEmail(user);

    await this.authService.checkPass(user.password);
    //verificar max, min caracteres y alfanumerico y simbolos (regExp)

    await this.authService.create(user);

    //crear evento para crear carrito

    return this.authService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
