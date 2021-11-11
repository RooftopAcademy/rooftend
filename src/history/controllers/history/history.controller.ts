import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { HistoryService } from 'src/history/services/history/history.service';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService : HistoryService) {}

    @Get()
    @HttpCode(200)
    getAll(){
        return this.historyService.getAll();
    }

    @Get(':id')
    @HttpCode(200)
    getOne(@Param('id') id : number){
        return this.historyService.getById(id);
    }

    @Post()
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
