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
import { UpdateResult, DeleteResult } from 'typeorm';
import { Observable } from 'rxjs';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  create(@Body() photo: PhotosInterface): Observable<PhotosInterface> {
    return this.photosService.create(photo);
  }

  @Get()
  findAll(): Observable<PhotosEntity[]> {
    return this.photosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<PhotosEntity> {
    return this.photosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: PhotosInterface,
  ): Observable<UpdateResult> {
    return this.photosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.photosService.delete(id);
  }
}
