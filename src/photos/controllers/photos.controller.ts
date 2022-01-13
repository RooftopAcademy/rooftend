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
} from '@nestjs/swagger';

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) { }

  @ApiCreatedResponse({ type: PhotosEntity, description: 'Created a new photo' })
  @ApiOperation({ summary: 'Create a photo' })
  @ApiBody({ type: PhotosEntity })
  @Post()
  create(@Body() photo: PhotosInterface): Observable<PhotosInterface> {
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

  @ApiOperation({ summary: 'Get a given photo' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 2,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Returns a given photo',
    type: PhotosEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    status: 404,
  })
  @Get(':id')
  public findOne(@Param('id') id: number, @Res() res): void {
    this.photosService
      .findOne(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return res.status(404).end(err.message);
      });
  }

  @ApiOperation({ summary: 'Update a given photo' })
  @ApiResponse({
    status: 200,
    description: 'Updated',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    status: 404,
  })
  @ApiBody({ type: PhotosEntity })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: PhotosInterface,
  ): Observable<UpdateResult> {
    return this.photosService.update(id, body);
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
