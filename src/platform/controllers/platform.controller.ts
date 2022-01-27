import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Platform } from '../entities/platform.entity';
import { PlatformService } from '../services/platform.service';

@ApiTags('Platforms')
@Controller('platforms')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @ApiOperation({ summary: 'Get all platforms' })
  @ApiOkResponse({
    status: 200,
    description: 'A list with all the platforms',
    type: [Platform],
  })
  @Get()
  @HttpCode(200)
  findAll() {
    return this.platformService.findAll();
  }
}
