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
} from '@nestjs/common';
import { Request, response } from 'express';
import { Category } from 'src/categories/categories.entity';
import { CategoriesService } from '../services/categories.service';


@Controller('categories')
export class CategoriesController {

   public constructor (private readonly categoriesService: CategoriesService) {}
    
   @Get()
    getAll(){
    return this.categoriesService.getAll();
    }
   
    @Get(':id')
    @HttpCode(200)

    async findOne(@Param('id') id:number, @Res({passthrough: true}) responde: Response,){
        return this.categoriesService
        .findOne(id)
        .then((data)=>{
            if(!data){
                response.status(400).end('Category not found');
            }
            return data;
        })
        .catch((err)=>{
            response.status(400).end(err.message);
        })
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
    @HttpCode(200)
    delete(@Param('id') id:number){
        return this.categoriesService.delete(id)
    }
}
