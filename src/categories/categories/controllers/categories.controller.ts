/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {

    constructor (private readonly categoriesService: CategoriesService) {}

    @Get()
    getAll(){
        return this.categoriesService.getAll();
    }
    @Get(':id')
    @HttpCode(201)
    findOneById(@Param('id') id:number){
        return this.categoriesService.findOneById(id);
    }

    @Post()
    @HttpCode(201)
    create(@Body() body){
        return this.categoriesService.create(body);
    }

    @Patch(':id')
    @HttpCode(200)
    update(@Param('id') id:number, @Body() body:any){
        return this.categoriesService.update(id,body)
    }
    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id:number){
        return this.categoriesService.delete(id);
    }
}
