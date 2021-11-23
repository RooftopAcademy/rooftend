import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
<<<<<<< HEAD
  NotFoundException,
=======
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
<<<<<<< HEAD
import { Response } from 'express';

import { PlatformService } from '../services/platform.service';

=======
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreatePlatformDTO } from '../create-platform-dto.entity';
import { Platform } from '../platform.entity';

import { PlatformService } from '../services/platform.service';

@ApiBearerAuth()
@ApiTags('Platforms')
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
@Controller('platforms')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

<<<<<<< HEAD
  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.platformService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
=======
  @ApiOperation({ summary: 'Get all platforms' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the platforms',
    type: Platform,
  })
  @Get()
  @HttpCode(200)
  findAll() {
    return this.platformService.findAll().then((data) => {
      return data;
    });
  }

  @ApiOperation({ summary: 'Get a platform by id' })
  @ApiResponse({
    status: 200,
    description: 'The found platform with that id',
    type: Platform,
  })
  @Get(':id')
  @HttpCode(200)
  findOne(
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
    @Param('id') id: number | string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.platformService
      .findOneById(id)
      .then((data) => {
        if (!data) {
          response.status(400).end('Platform not found');
        }
        return data;
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }

  @Post()
  @HttpCode(201)
<<<<<<< HEAD
  async create(@Body() body) {
    this.platformService.create(body);
=======
  @ApiOperation({ summary: 'Create a platform' })
  @ApiResponse({
    status: 201,
    description: 'The platform has been created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The platform could not be created',
  })
  async create(
    @Body() createPlatformDTO: CreatePlatformDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.platformService
      .create(createPlatformDTO)
      .then(() => {
        response.status(200).end('Platform created');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  }

  @Patch(':id')
  @HttpCode(200)
<<<<<<< HEAD
  async update(@Param('id') id: string, @Body() body) {
    this.platformService.update(parseInt(id), body);
=======
  @ApiOperation({ summary: 'Update a platform' })
  @ApiResponse({
    status: 200,
    description: 'The platform has been updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The platform could not be updated',
  })
  update(
    @Param('id') id: string | number,
    @Body() createPlatformDTO: CreatePlatformDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.platformService
      .findOneById(id)
      .then((data) => {
        if (!data) {
          response.status(400).end('Platform not found');
        }
        this.platformService.update(id, createPlatformDTO);
        response.status(200).end('Platform updated');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  }

  @Delete(':id')
  @HttpCode(204)
<<<<<<< HEAD
  async remove(@Param('id') id: string) {
    this.platformService.remove(parseInt(id));
=======
  @ApiOperation({ summary: 'Remove a platform' })
  @ApiResponse({
    status: 200,
    description: 'The platform has been removed successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The platform could not be removed',
  })
  remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.platformService
      .findOneById(id)
      .then((data) => {
        if (!data) {
          response.status(400).end('Platform not found');
        }
        this.platformService.remove(parseInt(id));
        response.status(200).end('Platform removed');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  }
}
