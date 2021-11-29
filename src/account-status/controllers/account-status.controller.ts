import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { AccountStatus } from '../models/account-status.dto';
import { AccountStatusService } from '../services/account-status.service';
import { Response } from 'express';
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


@ApiTags('Account Status')
@Controller('account-status')
export class AccountStatusController {
  constructor(private accountStatusService: AccountStatusService) { }

  @Post()
  @ApiOperation({ summary: 'Create a status' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Created new account status',
  })
  @ApiBody({ type: AccountStatus })
  create(@Body() accountStatus: AccountStatus): Promise<AccountStatus> {
    return this.accountStatusService.createStatus(accountStatus);
  }

  @Get()
  @ApiOperation({ summary: 'Get all status' })
  @ApiResponse({ status: 200, description: 'OK', type: [AccountStatus] })
  async findAll(): Promise<AccountStatus[]> {
    return await this.accountStatusService.findAllStatus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return account status with corresponding id' })
  @ApiOkResponse({
    status: 200,
    type: AccountStatus,
    description: 'OK Status found',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Status not found.',
  })
  @ApiParam({ name: 'id', type: Number, required: true })
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const status = await this.accountStatusService.findOneStatus(id);
    if (status) return res.status(200).send(status).end();
    return res.status(404).end('Status Not Found');
  }

  @Patch(':id')
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Update status' })
  @ApiParam({ name: 'id', type: Number, required: true })
  update(@Param('id') id: number, @Body() accountStatus: AccountStatus, res: Response): void {
    return res.status(403).end('Forbidden');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete status account' })
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  delete(@Param('id') id: number, res: Response): void {
    return res.status(403).end('Forbidden');
  }
}
