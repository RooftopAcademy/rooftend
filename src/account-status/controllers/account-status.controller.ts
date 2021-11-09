import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AccountStatus } from '../models/account-status.interface';
import { AccountStatusService } from '../services/account-status.service';

@Controller('account-status')
export class AccountStatusController {
    constructor(private accountStatusService: AccountStatusService) { }

    @Post()
    @HttpCode(201)
    create(@Body() accountStatus: AccountStatus): Promise<AccountStatus> {
        return this.accountStatusService.createStatus(accountStatus)
    }

    @Get()
    @HttpCode(200)
    findAll(): Promise<AccountStatus[]> {
        return this.accountStatusService.findAllStatus();
    }

    @Put(':id')
    @HttpCode(200)
    uptade(
        @Param('id') id: number,
        @Body() accountStatus: AccountStatus): Promise<UpdateResult> {
        return this.accountStatusService.updateStatus(id, accountStatus)
    }

    @Delete(':id')
    @HttpCode(204)
    dalete(@Param('id') id: number): Promise<DeleteResult> {
        return this.accountStatusService.deleteStatus(id)
    }
}
