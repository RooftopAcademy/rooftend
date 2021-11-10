import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
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
  async findOne(@Param('id') id: number | string, @Res() response) {
    this.platformService
      .findOneById(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return response.status(400).end(err.message);
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
