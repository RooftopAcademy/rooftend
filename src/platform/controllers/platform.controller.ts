import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
    this.platformService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOneById(@Param('id') id: string) {
    this.platformService.findOneById(parseInt(id));
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
