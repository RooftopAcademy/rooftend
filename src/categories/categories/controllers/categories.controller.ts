import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Res,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
<<<<<<< HEAD
import { Category } from '../../categories.entity';
import { Request } from 'express';
=======
>>>>>>> bbb407f8efef3984e93a845355b607a40b2b527e
import { CategoriesService } from '../services/categories.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from '../../categories.entity';
import { Response } from 'express';
import { ApiOperation, ApiTags ,ApiParam, ApiOkResponse,ApiNotFoundResponse} from '@nestjs/swagger';
import { send } from 'process';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  public constructor(private readonly categoriesService: CategoriesService) {}
    
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
    @HttpCode(200)
    @ApiOperation({summary: 'List categories'})
    @ApiParam({ name: 'id', type: Number, required: true, example: 1 })
    @ApiOkResponse({
      type: Category,
      description: 'The found review.',
    })
    @ApiNotFoundResponse({
      description: 'Category not found.',
      schema: {
        example: new NotFoundException('Category not found').getResponse(),
      },
    })
    async findOne(@Param('id') id:number, @Res() res:Response){
      const data = await this.categoriesService.findOne(id);
      if (data) return res.status(200).send(data).end();
      return res.status(404).end('Status Not Found')
    }
  
    @Post()
    @HttpCode(201)
    create(@Body() body: any) {
        return this.categoriesService.create(body);
    }

    @Patch(':id')
    @HttpCode(200)
    @ApiParam({ name: 'id', type: Number, required: true, example: 1 })
    update(@Param('id') id: number, @Body() body: any) {
        return this.categoriesService.update(id, body);
    }
    
    @Delete(':id')
    @HttpCode(204)
    @ApiParam({ name: 'id', type: Number, required: true, example: 1 })
    delete(@Param('id') id: number) {
        return this.categoriesService.delete(id);
    }
}
