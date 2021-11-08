import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PhotosService } from '../services/photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @HttpCode(201)
  create(@Body() photo: any) {
    return this.photosService.create(photo);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number) {
    return this.photosService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() body: any) {
    return this.photosService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: number) {
    return this.photosService.delete(id);
  }
}
