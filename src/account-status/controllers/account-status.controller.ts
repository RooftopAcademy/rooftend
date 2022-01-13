import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AccountStatusesEnum } from '../models/AccountStatusesEnum';


@ApiTags('Account Status')
@Controller('account-statuses')
export class AccountStatusController {
  @Get()
  @ApiOperation({ summary: 'Get all status' })
  // @ApiResponse({ status: 200, description: 'OK', type: [AccountStatusesEnum] })
  findAll(): Record<string, number> {
    return {
      BLOCKED: AccountStatusesEnum.BLOCKED,
      PENDING: AccountStatusesEnum.PENDING,
      ACTIVE: AccountStatusesEnum.ACTIVE,
      INACTIVE: AccountStatusesEnum.INACTIVE,
    };
  }
}
