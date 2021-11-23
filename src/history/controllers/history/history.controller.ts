import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { History } from 'src/history/models/history.entity';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { HistoryService } from 'src/history/services/history/history.service';


@ApiTags('history')
@Controller('history')
export class HistoryController {
    constructor(private readonly historyService : HistoryService) {}

    @Get()
    @HttpCode(200)
    getAll(){
        return this.historyService.getAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: History,
      })
    @HttpCode(200)
    getOne(@Param('id') id : number){
        return this.historyService.getById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create History' })
    @ApiResponse({ status: 201, description: 'Created.' })
    @HttpCode(201)
    create(@Body() body : any){
        return this.historyService.create(body);
    }

    @Put(':id')
    @HttpCode(204)
    update(@Param('id') id : number, @Body() body : any){
        return this.historyService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(200)
    delete(@Param('id') id){
        return this.historyService.delete(id);
    }
}
