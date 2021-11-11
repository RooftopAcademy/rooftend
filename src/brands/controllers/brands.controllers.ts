import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Brand } from '../entities/brands.entity';
import { brandsService } from '../services/brands.serveces';


@Controller('brands')
export class brandsController{

    constructor(private readonly brandService: brandsService){}
       
    @Get()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise < Pagination < Brand > > {
        limit = limit > 100 ? 100 : limit;
        return this.brandService.paginate({
          page, 
          limit, 
          route: '/brands',
        });
    }

    @Get(':id')
    getOne(@Param('id') id:number){
        return this.brandService.findOne(id);
    }

    @Post()
    create(@Body() body:any){
        return this.brandService.create(body);
    }

    @Patch()
    edit(@Param() id:number, @Body() body:any){
        return this.brandService.update(id, body);
    }

    @Delete()
    delete(@Param('id') id:number){
        return this.brandService.delete(id);
    }
}