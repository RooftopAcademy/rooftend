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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Response } from 'express';
import { User } from '../../users/entities/user.entity';
import { CreatePlatformDTO } from '../create-platform-dto.entity';
import { Platform } from '../platform.entity';

import { PlatformService } from '../services/platform.service';

@ApiTags('Platforms')
@Controller('platforms')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @ApiOperation({ summary: 'Get all platforms' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the platforms',
    type: [Platform],
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
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
  })
  @Get(':id')
  @HttpCode(200)
  findOne(
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
  @ApiOperation({ summary: 'Create a platform' })
  @ApiResponse({
    status: 201,
    description: 'The platform has been created successfully.',
    type: Platform,
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
        response.status(201).end('Platform created');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a platform' })
  @ApiResponse({
    status: 200,
    description: 'The platform has been updated successfully.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
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
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a platform' })
  @ApiResponse({
    status: 200,
    description: 'The platform has been removed successfully.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
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
  }
}
