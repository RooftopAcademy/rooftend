import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../entities/phone.entity';

@ApiTags('Phones')
@Controller('phones')
export class PhonesController {
  constructor(private phonesService: PhonesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all phones' })
  @ApiResponse({
    status: 200,
    description: 'The phones found',
    type: [Phone],
  })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.phonesService.paginate({
      page,
      limit,
      route: '/phones',
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get phone by id' })
  @ApiResponse({ status: 200, description: 'The phone found', type: Phone })
  getOne(@Param('id') id: number) {
    return this.phonesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create phone' })
  @ApiResponse({ status: 201, description: 'Phone created' })
  create(@Body() bodyParams: any) {
    return this.phonesService.create(bodyParams);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update phone' })
  @ApiResponse({ status: 200, description: 'Phone updated' })
  update(@Param('id') id: number, @Body() bodyParams: any) {
    return this.phonesService.update(id, bodyParams);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete phone' })
  @ApiResponse({ status: 200, description: 'Phone deleted' })
  delete(@Param('id') id: number) {
    return this.phonesService.delete(id);
  }
}
