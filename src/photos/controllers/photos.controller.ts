import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { PhotosService } from '../services/photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  create(@Body() photo: any) {
    return this.photosService.create(photo);
  }

  @Get()
  findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.photosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.photosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.photosService.delete(id);
  }
}
