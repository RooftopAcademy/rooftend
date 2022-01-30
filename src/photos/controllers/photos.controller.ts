import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Res,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpCode,
  Req,
} from '@nestjs/common';
import { PhotosInterface } from '../models/photos.interface';
import { PhotosService } from '../services/photos.service';
import { PhotosEntity } from '../models/photos.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Observable } from 'rxjs';
import {
  ApiCreatedResponse,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService
  ) { }
  @ApiCreatedResponse({ 
    type: PhotosEntity, 
    description: 'Created a new photo' 
  })
  @ApiOperation({ summary: 'Create a photo' })
  @ApiBody({ type: PhotosEntity })
  @HttpCode(201)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() photo: PhotosInterface,
    @Req() req: Request,
  ): Observable<PhotosInterface> {
    return this.photosService.create(photo);
  }

  @ApiOperation({ summary: 'Return all photos' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Number of the page',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Max number of results (10 by default)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all photos',
    type: PhotosEntity,
  })
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.photosService.paginate({
      page,
      limit,
      route: '/photos',
    });
  }

  @ApiOperation({ summary: 'Delete a given photo' })
  @ApiOkResponse({
    status: 200,
    description: 'Deleted',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    status: 404,
  })
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.photosService.delete(id);
  }
}
