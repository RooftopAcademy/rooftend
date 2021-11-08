import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountStatus } from '../model/account-status.interface';
import { AccountStatusService } from '../services/account-status.service';

@Controller('account-status')
export class AccountStatusController {
    constructor(private accountStatusService: AccountStatusService) { }

    @Post()
    create(@Body() accountStatus: AccountStatus) {
        return this.accountStatusService.createStatus(accountStatus)
    }

    @Get()
    findAll() {
        return this.accountStatusService.findAllStatus();
    }
    @Put(':id')
    uptade(
        @Param('id') id: number,
        @Body() accountStatus: AccountStatus) {
        return this.accountStatusService.uptateStatus(id, accountStatus)
    }

    @Delete(':id')
    dalete(@Param('id') id: number) {
        return this.accountStatusService.deleteStatus(id)
    }
}
