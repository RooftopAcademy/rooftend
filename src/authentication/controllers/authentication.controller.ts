import {
  Body,
  Controller,
  HttpCode,
  Patch,
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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LogInUserDTO } from '../../users/entities/log-in-user-dto.entity';
import STATUS from '../../statusCodes/statusCodes';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) { }

  @HttpCode(201)
  @ApiOperation({ summary: 'Register an user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiOkResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: STATUS.CREATED
    }
  })
  @ApiConflictResponse({
    description: 'The user is allready registered',
    status: 409,
    schema: {
      example: {
        "statusCode": 409,
        "message": "USER_IS_ALREADY_REGISTERED",
      }
    }
  })
  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  async register(@Body() user: CreateUserDTO) {
    await this.authService.checkEmail(user);

    await this.authService.create(user);
  }

  @ApiOperation({ summary: 'Confirmation of a registered user' })
  @ApiBody({
    schema: {
      example: {
        "transaction": "c10e1c3a1e9487aefa7d1cde77bfb71105ba590994dec8adaa0e46b2437435805626d2cda4693451e418877a9e599b746f4ce0c000da1adbc7fdfc6de82d7aec"
      }
    }
  })
  @ApiOkResponse({
    status: 200,
    description: 'The user was confirmed successfully',
    schema: {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjVAZ21haWwuY29tIiwiaWF0IjoxNjQxOTEzNzUyLCJleHAiOjE2NDE5MTM4MTJ9.MzLodS6l0APNS5Y1l6Gfc8biA1S0TBasUjikB7E_hEU',
      },
    },
  })
  @ApiConflictResponse({
    description: 'The transaction is expired0',
    status: 409,
    schema: {
      example: {
        "statusCode": 409,
        "message": "TRANSACTION_EXPIRED",
      }
    }
  })
  @ApiConflictResponse({
    description: 'The user is already active',
    status: 409,
    schema: {
      example: {
        "statusCode": 409,
        "message": "USER_IS_ALREADY_ACTIVE",
      }
    }
  })
  @ApiForbiddenResponse({
    description: 'The user is inactive or blocked',
    status: 403,
    schema: {
      example: {
        "statusCode": 403,
        "message": "USER_IS_INACTIVE_OR_BLOCKED",
      }
    }
  })
  @Public()
  @Patch('confirm-user')
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
