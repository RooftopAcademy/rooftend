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
import { Request } from 'express';
import categories from '../mock/categories';
import { CategoriesService } from '../services/categories.service';


@Controller('categories')
export class CategoriesController {

   public constructor (private readonly categoriesService: CategoriesService) {}
    @Get()
    public index(@Req() req : Request) {
    return this.categoriesService.getAll()
    }
   
    @Get(':id')
    @HttpCode(201)
    public findOneById(@Param('id') id:number | string){
        
        // this.categoriesService.findOneById(id)
        // .then(data=>{
        //     return data
        // }).catch(err => {
        //     return res.status(404).end(err.message)
        // })
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
    delete(@Param('id') id:number,@Res() res){
        res.send('ok')
    }
}
