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
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LogInUserDTO } from '../../users/entities/log-in-user-dto.entity';

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
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjVAZ21haWwuY29tIiwiaWF0IjoxNjQxOTEzNzUyLCJleHAiOjE2NDE5MTM4MTJ9.MzLodS6l0APNS5Y1l6Gfc8biA1S0TBasUjikB7E_hEU',
      },
    },
  })
  @ApiConflictResponse({
    description: 'The user is allready registered',
    status: 409,
  })
  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  async register(@Body() user: CreateUserDTO) {
    await this.authService.checkEmail(user);

    await this.authService.create(user);
  }

  @Public()
  @Post('confirm-user')
  async confirmUser(@Body('transaction') transaction: string) {
    return this.authService.confirmRegistry(transaction);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LogInUserDTO })
  @ApiResponse({
    status: 200,
    description: 'The user logged in',
    schema: {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjVAZ21haWwuY29tIiwiaWF0IjoxNjQxOTEzNzUyLCJleHAiOjE2NDE5MTM4MTJ9.MzLodS6l0APNS5Y1l6Gfc8biA1S0TBasUjikB7E_hEU',
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
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Body() user: LogInUserDTO, @Req() req) {
    return this.authService.login(req.user, user.password);
  }
}
