import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PlatformService } from '../services/platform.service';

@Controller('platform')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @Get()
  async findAll() {
    this.platformService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    this.platformService.findOneById(id);
  }

  @Post()
  async create(@Body() body) {
    this.platformService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body) {
    this.platformService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.platformService.remove(id);
  }
}
