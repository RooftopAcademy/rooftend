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
import { BrandsService } from '../services/brands.serveces';
import { createBrandDTO } from '../entities/create-brands-dto.entity';

@Controller('brands')
export class BrandsController{

    constructor(private brandService: BrandsService){}

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
    create(@Body() createBrandDTO:createBrandDTO){
        return this.brandService.create(createBrandDTO);
    }

    @Patch()
    update(@Param() id: number, @Body() createBrandDTO:createBrandDTO){
        return this.brandService.update(id, createBrandDTO);
    }

    @Delete()
    delete(@Param('id') id:number){
        return this.brandService.delete(id);
    }
}