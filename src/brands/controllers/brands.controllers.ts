import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { 
    brandsService 
} from '../services/brands.serveces';

@Controller('brands')
export class brandsController{

    constructor(private brandService: brandsService){}

    @Get()
    getAll(){
        return this.brandService.findAll();
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