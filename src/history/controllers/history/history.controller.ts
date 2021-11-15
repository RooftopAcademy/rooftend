import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { History } from 'src/history/models/history.entity';
import { HistoryService } from 'src/history/services/history/history.service';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService : HistoryService) {}

    @Get()
    @HttpCode(200)
    async getAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
      ): Promise<Pagination<History>> {
        limit = limit > 100 ? 100 : limit;
        return this.historyService.paginate({
          page,
          limit,
          route: '/stores',
        });
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
