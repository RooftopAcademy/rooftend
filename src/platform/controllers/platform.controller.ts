import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreatePlatformDTO } from '../entities/create-platform-dto.entity';
import { Platform } from '../entities/platform.entity';

import { PlatformService } from '../services/platform.service';
import { UpdatePlatformDTO } from '../entities/update-platform-dto.entity';

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
    return this.platformService.findAll();
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
  findOne(@Param('id') id: number | string) {
    return this.platformService.findOneById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
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
  async create(@Body() createPlatform: CreatePlatformDTO) {
    return this.platformService.create(createPlatform);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
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
    @Body() updatePlatform: UpdatePlatformDTO,
  ) {
    return this.platformService.update(id, updatePlatform);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a platform' })
  @ApiResponse({
    status: 204,
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
  remove(@Param('id') id: string | number) {
    return this.platformService.remove(id);
  }
}
