import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccountStatusesEnum } from '../models/AccountStatusesEnum';

@ApiBearerAuth()
@ApiTags('Account Status')
@Controller('account-statuses')
export class AccountStatusController {
  @Get()
  @ApiOperation({ summary: 'Get all status' })
  findAll(): Record<string, number> {
    return {
      BLOCKED: AccountStatusesEnum.BLOCKED,
      PENDING: AccountStatusesEnum.PENDING,
      ACTIVE: AccountStatusesEnum.ACTIVE,
      INACTIVE: AccountStatusesEnum.INACTIVE,
    };
  }
}
