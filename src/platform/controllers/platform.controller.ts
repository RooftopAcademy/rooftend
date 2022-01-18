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
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreatePlatformDTO } from '../entities/create-platform-dto.entity';
import { Platform } from '../entities/platform.entity';

import { PlatformService } from '../services/platform.service';
import { UpdatePlatformDTO } from '../entities/update-platform-dto.entity';

@ApiTags('Platforms')
@Controller('platforms')
export class PlatformController {
  constructor(private platformService: PlatformService) { }

  @ApiOperation({ summary: 'Get all platforms' })
  @ApiOkResponse({
    status: 200,
    description: 'A list with all the platforms',
  })
  @Get()
  @HttpCode(200)
  findAll() {
    return this.platformService.findAll();
  }

  @ApiOperation({ summary: 'Get a platform by id' })
  @ApiOkResponse({
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
  @ApiCreatedResponse({
    status: 201,
    description: 'Created',
    type: Platform,
  })
  @ApiBadRequestResponse({
    description: 'The platform could not be created',
  })
  create(@Body() createPlatform: CreatePlatformDTO) {
    return this.platformService.create(createPlatform);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a platform' })
  @ApiOkResponse({
    status: 200,
    description: 'Updated',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
  })
  update(
    @Param('id') id: string | number,
    @Body() updatePlatform: UpdatePlatformDTO,
  ) {
    return this.platformService.update(id, updatePlatform);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete a platform' })
  @ApiOkResponse({
    status: 200,
    description: 'Deleted',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  delete(@Param('id') id: string | number) {
    return this.platformService.delete(id);
  }
}
