import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AccountStatus } from '../models/account-status.interface';
import { AccountStatusService } from '../services/account-status.service';
import { Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AccountStatusEntity } from '../models/account-status.entity';


@Controller('account-status')
export class AccountStatusController {
  constructor(private accountStatusService: AccountStatusService) { }

  @Post()
  @ApiOperation({ summary: 'Create a status' })
  @ApiCreatedResponse({ status: 201, description: 'Created new account status' })
  create(@Body() accountStatus: AccountStatus): Promise<AccountStatus> {
    return this.accountStatusService.createStatus(accountStatus);
  }

  @Get()
  @ApiOperation({ summary: 'Get all status' })
  @ApiResponse({ status: 200, description: 'OK', type: [AccountStatusEntity] })
  async findAll(): Promise<AccountStatus[]> {
    return await this.accountStatusService.findAllStatus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return account status with corresponding id' })
  @ApiResponse({ status: 200, description: 'OK', type: AccountStatusEntity })
  @ApiParam({ name: 'id', type: Number, required: true })
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const status = await this.accountStatusService.findOneStatus(id);
    if (status) return res.status(200).send(status).end();
    return res.status(404).end('Status Not Found');
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiOperation({ summary: 'Update status' })
  @ApiParam({ name: 'id', type: Number, required: true })
  async update(
    @Param('id') id: number,
    @Body() accountStatus: AccountStatus,
  ): Promise<UpdateResult> {
    return await this.accountStatusService.updateStatus(id, accountStatus);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete status account' })
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiResponse({ status: 200, description: 'OK' })
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.accountStatusService.deleteStatus(id);
  }
}
