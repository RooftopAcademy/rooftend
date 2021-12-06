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
import { CategoriesService } from '../services/categories.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from '../../categories.entity';
import { Response } from 'express';
import { ApiOperation, ApiTags ,ApiParam, ApiOkResponse,ApiNotFoundResponse, ApiBody, ApiResponse} from '@nestjs/swagger';


@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  public constructor(private readonly categoriesService: CategoriesService) {}
    
  @Get()
  @ApiOperation({summary: 'Returns categories available'})
  @ApiOkResponse({
    type:Category,
    description: 'The categories available',
    isArray: true
  })
  @ApiNotFoundResponse({
    description: 'No categories available',
    schema: {
      example: new NotFoundException('No categories available').getResponse(),
    },
  })
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
    @ApiOperation({summary: ' categories'})
    @ApiParam({ name: 'id', type: Number, required: true, example: 1 })
    @ApiOkResponse({
      type: Category,
      description: 'The category found.',
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
      res.status(404).end('Status Not Found')
    }
  
    @Post()
    @ApiResponse({
      status: 403,
      description:'Forbidden'
    })
    @HttpCode(403)
    create(@Res() res:Response) {
        res.status(403).end();
    }

    @Patch()
    @ApiResponse({
      status: 403,
      description:'Forbidden'
    })
    @HttpCode(403)
    update(@Res() res: Response) {
        res.status(403).end();
    }
    
    @Delete()
    @ApiResponse({
      status: 403,
      description:'Forbidden'
    })
    @HttpCode(403)
    delete(@Res() res: Response) {
        res.status(403).end();
    }
}
