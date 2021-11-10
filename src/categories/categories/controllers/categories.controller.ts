/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Req,
  Res,
  DefaultValuePipe,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { Request } from 'express';
import categories from '../mock/categories';
import {Category} from 'src/categories/categories.entity';
import { CategoriesService } from '../services/categories.service';
import  {  Pagination  } from 'nestjs-typeorm-paginate' ;

@Controller('categories')
export class CategoriesController {

   public constructor (private readonly categoriesService: CategoriesService) {}
    
   @Get()
   getAll(){
       return this.categoriesService.getAll();
   }

   @Get('')
    async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise <Pagination<Category>>{
    limit = limit > 100 ? 100 : limit;
    return this.categoriesService.paginate({
      page,
      limit,
      route: '/categories',
    });
  }
    @Get(':id')
    @HttpCode(201)
    public findOneById(@Param('id') id:number){}
    
    @Post()
    @HttpCode(201)
    create(@Body() body: any) {
        return this.categoriesService.create(body);
    }

    @Patch(':id')
    @HttpCode(200)
    update(@Param('id') id: number, @Body() body: any) {
        return this.categoriesService.update(id, body);
    }
    
    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: number) {
        return this.categoriesService.delete(id);
    }
}