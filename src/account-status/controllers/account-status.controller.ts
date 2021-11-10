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
    async findAll(): Promise<AccountStatus[]> {
        return await this.accountStatusService.findAllStatus();
    }


    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id') id: number): Promise<AccountStatus> {
        return await this.accountStatusService.findOneStatus(id);
    }

    @Put(':id')
    @HttpCode(200)
    async update(
        @Param('id') id: number,
        @Body() accountStatus: AccountStatus): Promise<UpdateResult> {
        return await this.accountStatusService.updateStatus(id, accountStatus)
    }

    @Delete(':id')
    @HttpCode(200)
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.accountStatusService.deleteStatus(id)
    }
}
