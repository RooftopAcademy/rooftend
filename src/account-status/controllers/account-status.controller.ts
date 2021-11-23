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

@Controller('account-status')
export class AccountStatusController {
  constructor(private accountStatusService: AccountStatusService) {}

  @Post()
  @HttpCode(201)
  create(@Body() accountStatus: AccountStatus): Promise<AccountStatus> {
    return this.accountStatusService.createStatus(accountStatus);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<AccountStatus[]> {
    return await this.accountStatusService.findAllStatus();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const status = await this.accountStatusService.findOneStatus(id);
    if (status) return res.status(200).send(status).end();
    return res.status(404).end('Status Not Found');
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() accountStatus: AccountStatus,
  ): Promise<UpdateResult> {
    return await this.accountStatusService.updateStatus(id, accountStatus);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.accountStatusService.deleteStatus(id);
  }
}
