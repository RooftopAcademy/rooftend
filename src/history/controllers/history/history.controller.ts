import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { HistoryService } from 'src/history/services/history/history.service';
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

    @ApiOperation({ summary: 'Get all history' })
    @ApiResponse({
      status: 200,
      description: 'A list with all the History',
      type: History,
    })
    @Get()
    @HttpCode(200)
    getAll(){
        return this.historyService.getAll();
    }

    @ApiOperation({ summary: 'Get a history by id' })
    @ApiResponse({
      status: 200,
      description: 'The found History with that id',
      type: History,
    })
    @Get(':id')
    @HttpCode(200)
    getOne(@Param('id') id : number){
        return this.historyService.getById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a history' })
    @ApiResponse({  
      status: 201,
      description: 'The history has been created successfully.',
    })
    @HttpCode(201)
    create(@Body() body : any){
        return this.historyService.create(body);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a history' })
    @ApiResponse({
      status: 200,
      description: 'The history has been updated successfully.',
    })
    @HttpCode(204)
    update(@Param('id') id : number, @Body() body : any){
        return this.historyService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove a history' })
    @ApiResponse({
      status: 200,
      description: 'The history has been removed successfully.',
    })
    @HttpCode(200)
    delete(@Param('id') id){
        return this.historyService.delete(id);
    }
}
