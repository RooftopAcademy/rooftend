/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param,Post,Body, Put, Delete } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
    @Get('')
    getAll(){
        return []
    }
    @Get(':id')
    getOne(@Param('id') id:number){
        return id;
    }

    @Post()
    create(@Body() body: any){
        return body;
    }

    @Put(':id')
    update(@Param('id') id:number, @Body() body:any){
        return body
    }
    @Delete(':id')
    delete(@Param('id') id:number){
        return true;
    }
}
