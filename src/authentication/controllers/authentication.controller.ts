import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from '../decorators/public.decorator';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
  } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'Register an user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: 201,
    description: 'The user was registered',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjVAZ21haWwuY29tIiwiaWF0IjoxNjQxOTEzNzUyLCJleHAiOjE2NDE5MTM4MTJ9.MzLodS6l0APNS5Y1l6Gfc8biA1S0TBasUjikB7E_hEU',
      },
    },
  })
  @ApiBadRequestResponse({
    description:'The user is allready registered',
    status: 409
  })
  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  async register(@Body() user: CreateUserDTO) {
    await this.authService.checkEmail(user);

    await this.authService.create(user);

    return this.authService.login(user);
  }

  @HttpCode(201)
  @ApiOperation({summary: 'Login a user'})
  @ApiResponse({
    status: 201,
    description: 'The user logged in',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjVAZ21haWwuY29tIiwiaWF0IjoxNjQxOTEzNzUyLCJleHAiOjE2NDE5MTM4MTJ9.MzLodS6l0APNS5Y1l6Gfc8biA1S0TBasUjikB7E_hEU',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    status: 401,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    status: 404,
  })
  @ApiParam({
    name: 'user',
    example: {
      password: 'hola1234*',
      email: 'pepe@gmail.com',
    },
    type: CreateUserDTO,
  })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
}
