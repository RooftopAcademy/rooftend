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

  @Get(':id')
  public findOne(@Param('id') id, @Res() res): void {
    this.photosService
      .findOne(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return res.status(404).end(err.message);
      });
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
