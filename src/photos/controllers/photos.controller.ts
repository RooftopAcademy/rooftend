import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
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
  ApiBadRequestResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @ApiCreatedResponse({ description: 'create new photo' })
  @ApiOperation({ summary: 'Create a photo' })
  @ApiBody({ type: PhotosEntity })
  @Post()
  create(@Body() photo: PhotosInterface): Observable<PhotosInterface> {
    return this.photosService.create(photo);
  }

  @ApiOperation({ summary: 'Return all photos' })
  @ApiResponse({
    status: 200,
    description: 'Returns all photos',
    type: PhotosEntity,
  })
  @Get()
  findAll(): Observable<PhotosEntity[]> {
    return this.photosService.findAll();
  }

  @ApiOperation({ summary: 'Get a given photo' })
  @ApiResponse({
    status: 200,
    description: 'Returns a given photo',
    type: PhotosEntity,
  })
  @ApiBadRequestResponse({
    description: 'The id provided was not found',
    status: 404,
  })
  @Get(':id')
  findOne(@Param('id') id: number): Observable<PhotosEntity> {
    return this.photosService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a given photo' })
  @ApiResponse({
    status: 200,
    description: 'Updates a given photo',
    type: PhotosEntity,
  })
  @ApiBadRequestResponse({
    description: 'The update operation could not be executed',
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
  @ApiResponse({
    status: 204,
    description: 'Updates a given photo',
    type: PhotosEntity,
  })
  @ApiBadRequestResponse({
    description: 'The id provided was not found',
    status: 404,
  })
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.photosService.delete(id);
  }
}
