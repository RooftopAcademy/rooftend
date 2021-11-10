import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PlatformService } from '../services/platform.service';

@Controller('platforms')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.platformService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: number | string) {
    return this.platformService
      .findOneById(id)
      .then((data) => {
        if (!data) {
          throw new NotFoundException('Platform not found');
        }
        return data;
      })
      .catch((err) => {
        return err.message;
      });
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body) {
    this.platformService.create(body);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() body) {
    this.platformService.update(parseInt(id), body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    this.platformService.remove(parseInt(id));
  }
}
